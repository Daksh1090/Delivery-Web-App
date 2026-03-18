import pool from "../../config/db.js";
import imagekit from "../../services/ImageKit/imageKitConfig.js";
// Get Restaurants
export const getAllRestourants = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM restaurants");
    const restaurants = result.rows;

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllUsers = async ( req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users")
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
}

export const approveRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE restaurants SET status = 'approved' WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({
      message: "Restaurant approved successfully",
      restaurant: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const rejectRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE restaurants SET status = 'rejected' WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({
      message: "Restaurant rejected successfully",
      restaurant: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    let icon_url = null;

    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });

      icon_url = result.url;
    }

    const data = await pool.query(
      "INSERT INTO categories (name, icon_url) VALUES ($1,$2) RETURNING *",
      [name, icon_url]
    );

    res.json(data.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFoodCategory = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};


export const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let imageUrl = null;

    // upload new icon if provided
    if (req.file) { 
      const result = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/categories",
      });

      imageUrl = result.url;
    }

    // check category exists
    const categoryCheck = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [id]
    );

    if (categoryCheck.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedCategory = await pool.query(
      `UPDATE categories
       SET name=$1,
       icon_url = COALESCE($2, icon_url)
       WHERE id=$3
       RETURNING *`,
      [name, imageUrl, id]
    );

    res.json({
      message: "Category updated successfully",
      category: updatedCategory.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};