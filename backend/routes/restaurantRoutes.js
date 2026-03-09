import express from "express";
import {  registerRestaurant, loginResta } from "../controllers/restaurantController.js";

const router = express.Router();

router.post('/register-restaurant', registerRestaurant);
router.post('/login-restaurant', loginResta);

export default router;