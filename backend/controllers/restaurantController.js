import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerRestaurant = async (req, res) => {
  try {
    const {
      owner_name,
      restaurant_name,
      email,
      phone,
      address,
      city,
      password,
    } = req.body;

    // validation
    if (!owner_name || !restaurant_name || !email || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    // check if restaurant already exists
    const isExist = await pool.query(
      "SELECT * FROM restaurants WHERE email = $1",
      [email],
    );

    if (isExist.rows.length > 0) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert restaurant
    const result = await pool.query(
      `INSERT INTO restaurants 
      (owner_name, restaurant_name, email, phone, address, city, password)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id, owner_name, restaurant_name, email, phone, address, city`,
      [
        owner_name,
        restaurant_name,
        email,
        phone,
        address,
        city,
        hashedPassword,
      ],
    );

    res.status(201).json({
      message: "Restaurant registered successfully",
      restaurant: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginResta = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const result = await pool.query(
      "SELECT * FROM restaurants WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      token,
      data: {
        id: user.id,
        restaurant_name: user.restaurant_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const addFood = async (req, res) => {
  try {
    const { name, description, price, category_id, image } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const restaurant_id = req.userId;

    const result = await pool.query(
      `INSERT INTO foods
      (name, description, price, restaurant_id, category_id, image)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [name, description, price, restaurant_id, category_id, image]
    );

    res.status(201).json({
      message: "Food added successfully",
      food: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};