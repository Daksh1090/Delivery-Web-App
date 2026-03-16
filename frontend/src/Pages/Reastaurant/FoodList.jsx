import React, { useState, useEffect } from "react";
import api from "../../Api/api"; // your Axios instance
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/api/foods"); // API: all foods for this restaurant
        setFoods(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
  try {
    await api.delete(`/api/delete-food/${id}`);
    setFoods(foods.filter((f) => f.id !== id));
    toast.success("Food deleted successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Error deleting food");
  }
};

  const handleToggle = async (food) => {
    try {
      const res = await api.patch(`/api/toggle-food/${food.id}`);
      setFoods(
        foods.map((f) =>
          f.id === food.id ? { ...f, is_avaliable: res.data.is_avaliable } : f,
        ),
      );
      toast.success("Availability updated!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating availability");
    }
  };

  const handleEdit = (id) => {
    navigate("/restaurant/edit-food", {
      state: { id },
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Foods</h2>

      {foods.length === 0 ? (
        <p className="text-gray-500 text-center">No foods added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-gray-600 font-medium">
                  Image
                </th>
                <th className="p-3 text-left text-gray-600 font-medium">
                  Name
                </th>
                <th className="p-3 text-left text-gray-600 font-medium">
                  Price
                </th>
                <th className="p-3 text-left text-gray-600 font-medium">
                  Category
                </th>
                <th className="p-3 text-center text-gray-600 font-medium">
                  Available
                </th>
                <th className="p-3 text-center text-gray-600 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foods.map((food) => (
                <tr key={food.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">
                    <img
                      src={food.image || "https://via.placeholder.com/60"}
                      alt={food.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 text-gray-700 font-medium">{food.name}</td>
                  <td className="p-3 text-gray-700">${food.prize}</td>
                  <td className="p-3 text-gray-700">{food.category_name}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggle(food)}
                      className={`px-3 py-1 rounded-full text-white font-semibold transition-colors ${
                        food.is_avaliable
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {food.is_avaliable ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(food.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FoodList;
