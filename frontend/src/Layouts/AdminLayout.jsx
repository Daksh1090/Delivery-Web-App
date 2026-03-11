import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";
import AdminHeader from "../Components/AdminHeader";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 md:hidden"
        ></div>
      )}

      <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1">

        <AdminHeader toggleSidebar={toggleSidebar} />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;