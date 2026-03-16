import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import { toast } from "react-toastify";

function Category() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editIconUrl, setEditIconUrl] = useState("");

  const handleEdit = (cat) => {
    setShowForm(true);
    setEditId(cat.id);
    setName(cat.name);
    setPreview(cat.icon_url);
    setEditIconUrl(cat.icon_url);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/delete-category/${id}`);
      toast.success("Category deleted");

      fetchCategories();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (icon) {
        formData.append("icon", icon);
      }

      if (editId) {
        await api.put(`/api/update_Category/${editId}`, formData);
        toast.success("Category updated!");
      } else {
        await api.post("/api/add-category", formData);
        toast.success("Category added!");
      }

      setName("");
      setIcon(null);
      setPreview(null);
      setEditId(null);
      setShowForm(false);

      fetchCategories();
    } catch (error) {
      toast.error("Error saving category");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/get_category");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setIcon(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Categories</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded mb-6 flex flex-col gap-4"
        >
          <div className="flex justify-center">
            <label className="w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Upload Icon</span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {editId ? "Update Category" : "Add Category"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setName("");
                  setPreview(null);
                  setIcon(null);
                  setShowForm(false);
                }}
                className="bg-gray-400 text-white p-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Category List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative border p-3 rounded text-center shadow group"
          >
            {/* Hover Buttons */}
            <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
              <button
                onClick={() => handleEdit(cat)}
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat.id)}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>

            <img
              src={cat.icon_url}
              alt={cat.name}
              className="w-16 h-16 object-cover mx-auto mb-2"
            />

            <p className="font-medium">{cat.name}</p>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setName("");
                  setPreview(null);
                }}
                className="bg-gray-400 text-white p-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
