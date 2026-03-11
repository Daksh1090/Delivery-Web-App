import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

function SearchSection() {
  return (
    <div className="px-5 pt-6 pb-8 rounded-b-3xl">
      
      {/* Title */}
      <h2 className="text-white text-lg font-semibold mb-4">
        What would you prefer to eat today?
      </h2>

      {/* Search Bar */}
      <div className="flex items-center bg-black rounded-full px-4 py-3 shadow-lg">
        
        <IoSearchOutline className="text-gray-400 text-2xl mr-3" />

        <input
          type="text"
          placeholder="Search menu, restaurant"
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
        />

        <HiOutlineAdjustmentsHorizontal className="text-gray-400 text-xl cursor-pointer" />
      </div>
      
    </div>
  );
}

export default SearchSection;