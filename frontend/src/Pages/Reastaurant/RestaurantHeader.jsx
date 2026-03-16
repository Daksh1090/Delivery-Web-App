import { GiHamburgerMenu } from "react-icons/gi";

function RestaurantHeader({ toggleSidebar }) {
  return (
    <header className="w-full shadow p-4 flex justify-between items-center">

      {/* Mobile Menu */}
      <button
        onClick={toggleSidebar}   // now this is correctly a function
        className="text-xl md:hidden"
      >
        <GiHamburgerMenu />
      </button>

      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        Logout
      </button>

    </header>
  );
}

export default RestaurantHeader;