import express from "express";
import { LoginUser, RegisterUser, getFavorites, otpVerification, resendOtp, toggleFavorite } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/otp-verify", otpVerification);
router.post("/resend-otp", resendOtp);
router.post("/favorite",authMiddleware, toggleFavorite);
router.get("/favorites",authMiddleware, getFavorites);

export default router;