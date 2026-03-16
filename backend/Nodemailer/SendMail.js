import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any SMTP service
      auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD, // App Password if using Gmail
      },
    });

    // 2. Email options
    const mailOptions = {
      from: process.env.GOOGLE_APP_EMAIL,
      to: email,
      subject: "OTP Verification",
      html: `<h2>Your OTP is ${otp}</h2>`,
    };

    // 3. Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};