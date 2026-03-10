import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email, otp) => {
  await resend.emails.send({
    from: process.env.GOOGLE_APP_EMAIL,
    to: email,
    subject: "OTP Verification",
    html: `<h2>Your OTP is ${otp}</h2>`
  });
};