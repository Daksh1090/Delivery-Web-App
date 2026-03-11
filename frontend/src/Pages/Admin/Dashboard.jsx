import AdminStats from "../../Components/AdminStats";


function Dashboard() {
  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <AdminStats />

      {/* Example section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4">
            Orders Chart
          </h2>

          <div className="h-40 flex items-center justify-center text-gray-400">
            Chart Area
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4">
            Revenue Chart
          </h2>

          <div className="h-40 flex items-center justify-center text-gray-400">
            Chart Area
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;