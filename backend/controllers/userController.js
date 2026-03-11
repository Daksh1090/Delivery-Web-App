import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../Nodemailer/SendMail.js";
import { generateOTP } from "../utils/generateOTP.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone)
      return res
        .status(400)
        .json({ success: false, message: "all field required" });

    const slat = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, slat);
    const otp = generateOTP();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, phone, otp, otp_expiry) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, encryptedPassword, phone, otp, otp_expiry],
    );

    await sendOtpEmail(otp, email);

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error("Create user Error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All field required" });

    //user Exist or not
    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userExist.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = userExist.rows[0];

    if(!user.is_verified) return res.status(400).json({ message : "User Not Verified"});

    // match password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate webtoken

    const token = jwt.sign(
  {
    userId: user.id,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
    });

    res.json({
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("error in login", error);
    res.status(500).json("Server Error");
  }
};

export const otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
  
    if ((!email || !otp))
      return res.status(400).json({ message: "Otp Required" });

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user || !user.otp)
      return res.status(400).json({ message: "Invalid Otp" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Wrong Otp" })
    }

    if (Date.now() > user.otp_expiry) {
      return res.status(400).json({ message: "Otp Expired" })
    }

    await pool.query("UPDATE users SET is_verified = true WHERE email = $1",[email])

    res.json({ message: "Otp verified successfully" });

  } catch (error) {
    console.error("Otp Verify Error", error);
    res.status(500).json("Server Error");
  }
};


export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) 
      return res.status(400).json({ message: "Email required" });

    // Check if user exists
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];
    if (!user) 
      return res.status(404).json({ message: "User not found" });

    // Generate new OTP and expiry (10 min)
    const otp = generateOTP();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);

    // Update user with new OTP and expiry
    await pool.query(
      "UPDATE users SET otp = $1, otp_expiry = $2 WHERE email = $3",
      [otp, otp_expiry, email]
    );

    // Send OTP email
    await otpSend(otp, email);

    res.json({ message: "OTP resent successfully" });

  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};