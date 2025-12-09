import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUser, FaUserTie, FaBan } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  // Fetch Users
  const { data: users = [] } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${search}`);
      return res.data;
    },
  });

  // update role
  const roleMutation = useMutation({
    mutationFn: async ({ userId, newRole }) =>
      await axiosSecure.patch(`/users/${userId}/role`, { role: newRole }),

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // refresh
      Swal.fire("Updated!", "User role changed.", "success");
    },
  });

  //  suspend or activate user
  const statusMutation = useMutation({
    mutationFn: async ({ userId, newStatus }) =>
      await axiosSecure.patch(`/users/${userId}`, { status: newStatus }),

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Updated!", "User status updated.", "success");
    },
  });

  // Handle role change confirmation
  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: "Change Role?",
      text: `Set role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        roleMutation.mutate({ userId: user._id, newRole });
      }
    });
  };

  // Suspend / Activate
  const handleStatusChange = (user) => {
    const newStatus = user.status === "active" ? "suspended" : "active";

    Swal.fire({
      title: `Confirm ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        statusMutation.mutate({ userId: user._id, newStatus });
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-4">Manage Users</h1>

      {/* Search */}
      <div className="flex justify-end mb-5">
        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered w-72"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Change Role</th>
              <th>Suspend</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const roleIcon =
                user.role === "admin" ? (
                  <MdAdminPanelSettings className="text-red-600" />
                ) : user.role === "manager" ? (
                  <FaUserTie className="text-blue-600" />
                ) : (
                  <FaUser className="text-green-600" />
                );

              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>

                  {/* User Info */}
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{user.displayName}</p>
                        <p className="text-xs opacity-60">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="font-medium flex items-center gap-2">
                    {roleIcon} {user.role}
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`badge ${
                        user.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Change Role */}
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      defaultValue=""
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                    >
                      <option value="" disabled>
                        Change Role
                      </option>
                      <option value="buyer">Buyer</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  {/* Suspend */}
                  <td>
                    <button
                      className={`btn btn-sm ${
                        user.status === "active" ? "btn-error" : "btn-success"
                      }`}
                      onClick={() => handleStatusChange(user)}
                    >
                      {user.status === "active" ? <FaBan /> : "Activate"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
