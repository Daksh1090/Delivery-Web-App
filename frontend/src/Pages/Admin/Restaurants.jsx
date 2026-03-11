import { useEffect, useState } from "react";
import api from "../../Api/api";
import { toast } from "react-toastify";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/api/get-restaurants");
        setRestaurants(res.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        toast.error("Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const approveRestaurant = async (id) => {
    try {
      await api.patch(`/api/approve-restaurant/${id}`);

      setRestaurants((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)),
      );

      toast.success("Restaurant Approved");
    } catch (error) {
      console.error("Approval failed", error);
      toast.error("Failed to approve restaurant");
    }
  };

  const rejectRestaurant = async (id) => {
    try {
      await api.patch(`/api/reject-restaurant/${id}`);

      setRestaurants((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)),
      );

      toast.error("Restaurant Rejected");
    } catch (error) {
      console.error("Reject failed", error);
      toast.error("Failed to reject restaurant");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading Restaurants...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Restaurants</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Owner</th>
              <th className="p-3">Restaurant</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">City</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No Restaurants Found
                </td>
              </tr>
            )}

            {restaurants.map((rest) => (
              <tr key={rest.id} className="border-t">
                <td className="p-3">{rest.owner_name}</td>
                <td className="p-3">{rest.restaurant_name}</td>
                <td className="p-3">{rest.email}</td>
                <td className="p-3">{rest.phone}</td>
                <td className="p-3">{rest.city}</td>

                {/* Status */}
                <td className="p-3">
                  {rest.status === "approved" && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                      Approved
                    </span>
                  )}

                  {rest.status === "pending" && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                      Pending
                    </span>
                  )}

                  {rest.status === "rejected" && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                      Rejected
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-3 flex gap-2">
                  {rest.status === "pending" && (
                    <>
                      <button
                        onClick={() => approveRestaurant(rest.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectRestaurant(rest.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {rest.status === "rejected" && (
                    <>
                      <button
                        onClick={() => approveRestaurant(rest.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Approve
                      </button>
                    </>
                  )}

                  {rest.status === "approved" && (
                    <>
                      <button
                        onClick={() => rejectRestaurant(rest.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Restaurants;
