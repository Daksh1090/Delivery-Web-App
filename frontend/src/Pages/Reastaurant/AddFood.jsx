import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import Input from "../../Components/Input";
import { toast } from "react-toastify";

function AddFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category_name, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get("/api/get-food-category");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category_id", categoryId);
      formData.append("category_name", category_name);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/api/add-food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Food added successfully!");

      setName("");
      setDescription("");
      setPrice("");
      setCategoryId("");
      setCategoryName("");
      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error(error);
      toast.error("Error adding food");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Food</h2>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

        {/* Image Upload at Top */}
        <div className="flex justify-center">
  <label className="w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative">

    {preview ? (
      <img
        src={preview}
        alt="preview"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="flex flex-col items-center text-gray-400">
        {/* Upload Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4"
          />
        </svg>

        <span className="text-sm mt-1">Upload Image</span>
      </div>
    )}

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
      required
    />

  </label>
</div>

        <Input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setCategoryName(e.target.options[e.target.selectedIndex].text);
          }}
          required
          className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Food
        </button>

      </form>
    </div>
  );
}

export default AddFood;