import transporter from "../services/nodemailer.js";

export const otpSend = async (otp, to) => {
  try {
    const info = await transporter.sendMail({
      from: `Delivery App <${process.env.GOOGLE_APP_EMAIL}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP for Delivery App is: ${otp}. It will expire in 5 minutes.`,
      // optional: you can use HTML
      html: `<p>Your OTP for <strong>Delivery App</strong> is: <strong>${otp}</strong></p>
             <p>It will expire in 5 minutes.</p>`
    });

    console.log("OTP sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // so caller knows email failed
  }
};