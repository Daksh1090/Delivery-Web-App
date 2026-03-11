import { GiHamburgerMenu } from "react-icons/gi";

function AdminHeader({ toggleSidebar }) {
  return (
    <header className="w-full shadow p-4 flex justify-between items-center">

      {/* Mobile Menu */}
      <button
        onClick={toggleSidebar}
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

export default AdminHeader;