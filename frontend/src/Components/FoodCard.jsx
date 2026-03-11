import { IoHeartOutline } from "react-icons/io5";

function FoodCard({ title, price, image, discount }) {
  return (
    <>
    <div className="bg-[#111] rounded-2xl overflow-hidden w-[260px] shadow-lg">

      {/* Image */}
      <div className="relative">
        <img src="/istockphoto-187248625-612x612.jpg" className="h-40 w-full object-cover" />

        <span className="absolute top-2 left-2 bg-red-500 text-xs px-2 py-1 rounded text-white">
          {discount}
        </span>

        <IoHeartOutline className="absolute top-2 right-2 text-white text-xl cursor-pointer" />
      </div>

      {/* Content */}
      <div className="p-4 text-white">

        <div className="flex justify-between font-semibold">
          <h3>Pizza</h3>
          <span>₹300</span>
        </div>

        <p className="text-gray-400 text-xs mt-2">
          20-35 min · 2.5 km
        </p>

        <p className="text-orange-400 text-xs mt-1">
          ⭐ 4.7 (35 Reviews)
        </p>

        <button className="bg-orange-500 w-full mt-4 py-2 rounded-lg hover:bg-orange-600">
          Buy Now
        </button>
      </div>
    </div>
    </>
  );
}

export default FoodCard;