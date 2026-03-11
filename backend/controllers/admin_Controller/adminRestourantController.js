import pool from "../../config/db.js";

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


// Get Users

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
