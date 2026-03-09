import express from "express";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js"

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    console.log("Server is running on Port 5000");
});
