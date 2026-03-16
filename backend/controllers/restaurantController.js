import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../Nodemailer/SendMail.js";
import { generateOTP } from "../utils/generateOTP.js";

import imagekit from "..//services/ImageKit/imageKitConfig.js";

export const registerRestaurant = async (req, res) => {
  try {
    const {
      owner_name,
      restaurant_name,
      email,
      phone,
      address,
      city,
      password,
    } = req.body;

    // validation
    if (!owner_name || !restaurant_name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // check existing restaurant
    const isExist = await pool.query(
      "SELECT id FROM restaurants WHERE email = $1",
      [email],
    );

    if (isExist.rows.length > 0) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    // insert restaurant
    const result = await pool.query(
      `INSERT INTO restaurants 
  (owner_name, restaurant_name, email, phone, address, city, password, otp, otp_expiry)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  RETURNING id, owner_name, restaurant_name, email, phone, address, city, otp, otp_expiry`,
      [
        owner_name,
        restaurant_name,
        email,
        phone,
        address,
        city,
        hashedPassword,
        otp,
        otp_expiry,
      ],
    );

    await sendOtpEmail(email, otp);

    res.status(201).json({
      message: "Restaurant registered successfully",
      restaurant: result.rows[0],
    });
  } catch (error) {
    console.error("Restaurant register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const RestaurantOtpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Otp Required" });

    const result = await pool.query(
      "SELECT * FROM restaurants WHERE email = $1",
      [email],
    );

    const user = result.rows[0];

    if (!user || !user.otp)
      return res.status(400).json({ message: "Invalid Otp" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Wrong Otp" });
    }

    if (Date.now() > user.otp_expiry) {
      return res.status(400).json({ message: "Otp Expired" });
    }

    await pool.query(
      "UPDATE restaurants SET is_verified = true WHERE email = $1",
      [email],
    );

    res.json({ message: "Otp verified successfully" });
  } catch (error) {
    console.error("Otp Verify Error", error);
    res.status(500).json("Server Error");
  }
};

export const loginResta = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const result = await pool.query(
      "SELECT * FROM restaurants WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      token,
      data: {
        id: user.id,
        restaurant_name: user.restaurant_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const RestaurantResendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });

    // Check if user exists
    const result = await pool.query(
      "SELECT * FROM restaurants WHERE email = $1",
      [email],
    );

    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate new OTP and expiry (10 min)
    const otp = generateOTP();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);

    // Update user with new OTP and expiry
    await pool.query(
      "UPDATE restaurants SET otp = $1, otp_expiry = $2 WHERE email = $3",
      [otp, otp_expiry, email],
    );

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addFood = async (req, res) => {
  try {
    const { name, description, price, category_id, category_name } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const restaurant_id = req.userId;

    let imageUrl = null;

    // Upload image to ImageKit
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/foods",
      });

      imageUrl = result.url;
    }

    const result = await pool.query(
      `INSERT INTO foods 
      (name, description, prize, restaurant_id, category_id, category_name, image)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        name,
        description,
        price,
        restaurant_id,
        category_id,
        category_name,
        imageUrl,
      ],
    );

    res.status(201).json({
      message: "Food added successfully",
      food: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFoodCategory = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

export const getFoods = async (req, res) => {
  try {
    const restaurant_id = req.userId;

    const result = await pool.query(
      "SELECT * FROM foods WHERE restaurant_id = $1",
      [restaurant_id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No foods found for this restaurant" });
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const toggleFoodAvailability = async (req, res) => {
  try {
    const restaurant_id = req.userId;
    const { id } = req.params;
    console.log(restaurant_id);
    console.log(id);

    if (!restaurant_id)
      return res.status(401).json({ message: "Unauthorized" });

    // Make sure the food belongs to this restaurant
    const food = await pool.query(
      "SELECT is_avaliable FROM foods WHERE id = $1 AND restaurant_id = $2",
      [id, restaurant_id],
    );

    if (food.rows.length === 0)
      return res.status(404).json({ message: "Food not found" });

    const currentAvailability = food.rows[0].is_avaliable;

    // Toggle availability
    const updated = await pool.query(
      "UPDATE foods SET is_avaliable = $1 WHERE id = $2 RETURNING *",
      [!currentAvailability, id],
    );

    res.json(updated.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const restaurant_id = req.userId;
    const { id } = req.params;

    if (!restaurant_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      "DELETE FROM foods WHERE id = $1 AND restaurant_id = $2 RETURNING *",
      [id, restaurant_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const editFood = async (req, res) => {
  try {
    const restaurant_id = req.userId;
    const foodId = req.params.id;

    if (!restaurant_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, description, price, category_id, category_name } = req.body;

    let imageUrl = null;

    // if new image uploaded
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/foods",
      });

      imageUrl = result.url;
    }

    // check food belongs to restaurant
    const foodCheck = await pool.query(
      "SELECT * FROM foods WHERE id = $1 AND restaurant_id = $2",
      [foodId, restaurant_id],
    );

    if (foodCheck.rows.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    const updatedFood = await pool.query(
      `UPDATE foods 
       SET name=$1, description=$2, prize=$3, category_id=$4, category_name=$5,
       image = COALESCE($6, image)
       WHERE id=$7 AND restaurant_id=$8
       RETURNING *`,
      [
        name,
        description,
        price,
        category_id,
        category_name,
        imageUrl,
        foodId,
        restaurant_id,
      ],
    );

    res.json({
      message: "Food updated successfully",
      food: updatedFood.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFoodDetail = async (req, res) => {
  try {
    const restaurant_id = req.userId;
    const foodId = req.params.id;

    if (!restaurant_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      "SELECT * FROM foods WHERE id = $1 AND restaurant_id = $2",
      [foodId, restaurant_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deteleFood = async (req, res) => {
  try {
    const restaurant_id = req.userId;
    const id = req.params.id;

    if (!restaurant_id)
      return res.status(401).json({ message: "Unauthorized" });

    const result = await pool.query(
      "DELETE FROM foods WHERE id = $1 AND restaurant_id = $2 RETURNING *",
      [id, restaurant_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ message: "Food Deleted Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};