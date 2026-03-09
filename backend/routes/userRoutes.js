import express from "express";
import { LoginUser, RegisterUser, otpVerification, resendOtp } from "../controllers/userController.js";

const router = express.Router();


router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/otp-verify", otpVerification);
router.post("/resend-otp", resendOtp);

export default router;