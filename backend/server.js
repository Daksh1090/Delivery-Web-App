import express from "express";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js"
import adminFood from "./routes/admin_Routes/adminRestourant.js";
import publicApis from "./routes/publicRoutes.js"

env.config();
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", adminFood);
app.use("/api", publicApis);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    console.log("Server is running on Port 5000");
});
