import { useEffect, useState } from "react";
import api from "../../Api/api";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/get-users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading Users...</div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Verified</th>
              <th className="p-3">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No Users Found
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3 font-medium">{user.name}</td>

                <td className="p-3">{user.email}</td>

                <td className="p-3">{user.phone}</td>

                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                    {user.role}
                  </span>
                </td>

                <td className="p-3">
                  {user.is_verified ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                      Verified
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                      Not Verified
                    </span>
                  )}
                </td>

                <td className="p-3 text-gray-500 text-sm">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
