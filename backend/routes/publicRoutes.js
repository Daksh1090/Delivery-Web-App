import express from "express";
import { getFood } from "../controllers/publicController.js";

const router = express.Router();

router.get("/home/getFood", getFood)

export default router;