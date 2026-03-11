import express from "express";
import {  registerRestaurant, loginResta, addFood } from "../controllers/restaurantController.js";
import { authRestaurant } from "../middleware/authRestaurant.js"

const router = express.Router();

router.post('/register-restaurant', registerRestaurant);
router.post('/login-restaurant', loginResta);
router.post("/add-food", authRestaurant, addFood);

export default router;