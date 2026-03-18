import pool from "../config/db.js";


export const getFood = async (req, res) => {
  try {
    const { category_id } = req.query;

    console.log("Category ID:", category_id);

    let result;

    // ✅ Case 1: All or no category
    if (!category_id || category_id === "All") {
      result = await pool.query("SELECT * FROM foods ORDER BY id DESC");
    } 
    // ✅ Case 2: Specific category
    else {
      result = await pool.query(
        "SELECT * FROM foods WHERE category_id = $1 ORDER BY id DESC",
        [category_id]
      );
    }

    res.status(200).json(result.rows);

  } catch (error) {
    console.error("Get Food Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};