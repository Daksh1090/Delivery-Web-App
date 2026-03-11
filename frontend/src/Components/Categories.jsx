import { FaHamburger, FaPizzaSlice, FaCookieBite, FaStar } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";

function Categories() {
  const categories = [
    { name: "All" },
    { name: "Burgers", icon: <FaHamburger /> },
    { name: "Pizza", icon: <FaPizzaSlice /> },
    { name: "Cookies", icon: <FaCookieBite /> },
    { name: "Noodles", icon: <GiNoodles /> },
    { name: "Desserts", icon: <FaStar /> },
  ];

  return (
    <section className="px-6 mt-6">
      <h2 className="text-white text-lg font-semibold mb-4">Categories</h2>

      <div className="flex gap-4 flex-wrap">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm
              ${
                cat.name === "All"
                  ? "bg-orange-500 text-white"
                  : "bg-[#3a1406] text-white"
              }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;