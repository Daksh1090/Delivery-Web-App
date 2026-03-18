import express from "express";
import {  registerRestaurant, loginResta, addFood, getFoodCategory, getFoods, toggleFoodAvailability, RestaurantOtpVerification, RestaurantResendOtp, editFood, getFoodDetail, deteleFood } from "../controllers/restaurantController.js";
import { authRestaurant } from "../middleware/authRestaurant.js"
import { upload } from "../config/multer.js";


const router = express.Router();

router.post('/register-restaurant', registerRestaurant);
router.post('/rest-otp-verify', RestaurantOtpVerification);
router.post('/rest-resend-otp', RestaurantResendOtp);
router.post('/login-restaurant', loginResta);
router.post("/add-food", authRestaurant, upload.single("image"), addFood);
router.get("/get-food-category", getFoodCategory);
router.get("/foods", authRestaurant, getFoods);
router.patch("/toggle-food/:id", authRestaurant, toggleFoodAvailability);
router.patch("/toggle-food/:id", authRestaurant, toggleFoodAvailability);
router.patch("/edit-food/:id", authRestaurant,upload.single("image"), editFood);
router.get("/get_foodDetail/:id", authRestaurant, getFoodDetail);
router.delete("/delete-food/:id", authRestaurant, deteleFood);


export default router;