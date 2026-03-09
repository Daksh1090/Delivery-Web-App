import express from "express";

const router = express.Router();

router.post("/food", AddFood);

export default router;