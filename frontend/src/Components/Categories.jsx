import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../Api/api";

function Categories({setSelectcategory}) {
  const [categories, setCategory] = useState([]); // ✅ fix
const [active, setActive] = useState(0);

  const getCategory = async () => {
    try {
      const res = await api.get("/api/get-food-category");

      const allCategory = {
      id: 0,
      name: "All",
      icon_url: "/all.png", // or any default icon
    };

    setCategory([allCategory, ...res.data]); // ✅ add first

    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching categories");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <section className="px-6 mt-6">
      <h2 className="text-white text-lg font-semibold mb-4">Categories</h2>

      <div className="flex gap-4 flex-wrap">
  {categories.map((cat) => (
    <button
      key={cat.id}
      onClick={() => {
        setActive(cat.id);
        setSelectcategory(cat.id);
      }}
      className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm
        ${
          active === cat.id
            ? "bg-orange-500 text-white"
            : "bg-[#3a1406] text-white"
        }`}
    >
      <img
        src={cat.icon_url}
        alt={cat.name}
        className="w-5 h-5"
      />
      {cat.name}
    </button>
  ))}
</div>
    </section>
  );
}

export default Categories;