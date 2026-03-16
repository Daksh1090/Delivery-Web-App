import express from "express";
import { addCategory, approveRestaurant, getAllRestourants, getAllUsers, getFoodCategory, rejectRestaurant, UpdateCategory} from "../../controllers/admin_Controller/adminRestourantController.js";
import { authAdmin } from "../../middleware/authAdmin.js";
import { upload } from "../../config/multer.js";

const router = express.Router();

router.get("/get-restaurants",authAdmin, getAllRestourants);
router.get("/get-users",authAdmin, getAllUsers);
router.patch("/approve-restaurant/:id", authAdmin, approveRestaurant);
router.patch("/reject-restaurant/:id", authAdmin, rejectRestaurant);
router.post("/add-category", authAdmin,upload.single("icon"), addCategory);
router.get("/get_category", authAdmin, getFoodCategory);
router.put("/update_Category/:id", authAdmin,upload.single("icon"), UpdateCategory);

export default router;