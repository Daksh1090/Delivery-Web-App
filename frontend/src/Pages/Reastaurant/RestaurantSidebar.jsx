import { Link, NavLink } from "react-router-dom";
import {
  IoHomeOutline,
  IoFastFoodOutline,
  IoBagOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { IoMdRestaurant } from "react-icons/io";

function RestaurantSidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <aside
      className={`
        fixed md:static
        top-0 left-0
        h-screen w-64
        bg-black text-white
        p-5
        transform
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Header */}
      <div className="flex w-full justify-between items-center mb-10">
        <h1 className="text-xl font-bold">Restaurant</h1>

        <button onClick={toggleSidebar} className="text-2xl md:hidden">
          <RxCross1 />
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-6">
        <NavLink
          to="/restaurant"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoHomeOutline />
          Dashboard
        </NavLink>

        <NavLink
          to="/restaurant/add-food"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoFastFoodOutline />
          <span>Add Food</span>
        </NavLink>

        <NavLink
          to="/restaurant/foods"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoBagOutline />
          <span>Foods</span>
        </NavLink>

        <NavLink
          to="/restaurant/orders"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoPeopleOutline />
          <span>Orders</span>
        </NavLink>

      </nav>
    </aside>
  );
}

export default RestaurantSidebar;