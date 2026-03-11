import {
  IoHomeOutline,
  IoFastFoodOutline,
  IoBagOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { IoMdRestaurant } from "react-icons/io";
import { NavLink } from "react-router-dom";

function AdminSidebar({ sidebarOpen, toggleSidebar }) {
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
        <h1 className="text-xl font-bold">Admin Panel</h1>

        <button onClick={toggleSidebar} className="text-2xl md:hidden">
          <RxCross1 />
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-6">
        <NavLink
          to="/admin"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoHomeOutline />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/foods"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoFastFoodOutline />
          <span>Foods</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoBagOutline />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoPeopleOutline />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/restaurents"
          onClick={toggleSidebar}
          className="flex items-center gap-3 hover:text-orange-400"
        >
          <IoMdRestaurant />
          <span>Restaurants</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
