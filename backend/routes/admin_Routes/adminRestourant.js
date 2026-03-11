import express from "express";
import { approveRestaurant, getAllRestourants, getAllUsers, rejectRestaurant, } from "../../controllers/admin_Controller/adminRestourantController.js";
import { authAdmin } from "../../middleware/authAdmin.js";

const router = express.Router();

router.get("/get-restaurants",authAdmin, getAllRestourants);
router.get("/get-users",authAdmin, getAllUsers);
router.patch("/approve-restaurant/:id", authAdmin, approveRestaurant);
router.patch("/reject-restaurant/:id", authAdmin, rejectRestaurant);

export default router;