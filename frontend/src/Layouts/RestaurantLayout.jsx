import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Reastaurant/RestaurantSidebar";
import RestaurantHeader from "../Pages/Reastaurant/RestaurantHeader";
import RestaurantSidebar from "../Pages/Reastaurant/RestaurantSidebar";

function RestaurantLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <RestaurantSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <RestaurantHeader toggleSidebar={toggleSidebar} />

        {/* Page content */}
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RestaurantLayout;