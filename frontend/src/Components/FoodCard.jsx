import { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import api from "../Api/api";

function FoodCard({ selectCategory }) {
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/api/favorites");
        const ids = res.data.map((item) => item.food_id);
        setFavorites(ids);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavorites();
  }, []);

  const handleFavorite = async (food_id) => {
    try {
      const res = await api.post("/api/favorite", { food_id });

      if (res.data.favorited) {
        setFavorites((prev) => [...prev, food_id]);
      } else {
        setFavorites((prev) => prev.filter((id) => id !== food_id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await api.get(
          selectCategory === 0
            ? `/api/home/getFood`
            : `/api/home/getFood?category_id=${selectCategory}`,
        );

        setFoods(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFood();
  }, [selectCategory]);

  return (
    <div className="flex flex-wrap gap-6 px-6 mt-6">
      {foods.map((food) => (
        <div
          key={food.id}
          className="bg-[#111] rounded-2xl overflow-hidden w-[260px] shadow-lg"
        >
          {/* Image */}
          <div className="relative">
            <img src={food.image} className="h-40 w-full object-cover" />

            {food.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-xs px-2 py-1 rounded text-white">
                {food.discount}%
              </span>
            )}

            {favorites.includes(food.id) ? (
              <IoHeart
                onClick={() => handleFavorite(food.id)}
                className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer"
              />
            ) : (
              <IoHeartOutline
                onClick={() => handleFavorite(food.id)}
                className="absolute top-2 right-2 text-white text-xl cursor-pointer"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-4 text-white">
            <div className="flex justify-between font-semibold">
              <h3>{food.name}</h3>
              <span>₹{food.prize}</span>
            </div>

            <p className="text-gray-400 text-xs mt-2">
              {food.time} min · {food.distance} km
            </p>

            <p className="text-orange-400 text-xs mt-1">
              ⭐ {food.rating} ({food.reviews} Reviews)
            </p>

            <button className="bg-orange-500 w-full mt-4 py-2 rounded-lg hover:bg-orange-600">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodCard;
