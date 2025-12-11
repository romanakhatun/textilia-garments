import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { refetchRole } = useRole();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // === Update Role
  const updateRole = async (id, role) => {
    const confirm = await Swal.fire({
      title: "Change Role?",
      text: `Assign role: ${role}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
    });

    if (!confirm.isConfirmed) return;
    await axiosSecure.patch(`/users/${id}/role`, { role });
    Swal.fire("Updated!", "User role updated successfully.", "success");

    refetch();
    refetchRole(); // Dashboard updates instantly
  };

  // === Approve User
  const approveUser = async (user) => {
    await axiosSecure.patch(`/users/${user._id}/approve`);
    await Swal.fire(
      "Approved!",
      `${user.displayName} is now approved.`,
      "success"
    );
    refetch();
  };

  // === Suspend User
  const suspendUser = async (user) => {
    const { value: reason } = await Swal.fire({
      title: `Suspend ${user.displayName}?`,
      input: "textarea",
      inputPlaceholder: "Enter reason...",
      showCancelButton: true,
    });
    if (!reason) return;
    await axiosSecure.patch(`/users/${user._id}/suspend`, { reason });
    Swal.fire("Suspended!", "User has been suspended.", "success");

    refetch();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Manage Users ({users.length})</h2>

      {/* SEARCH */}
      <label className="input flex items-center gap-2 mb-5">
        <input
          type="search"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search users"
          className="grow"
        />
      </label>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter(
                (u) =>
                  u.displayName?.toLowerCase().includes(searchText) ||
                  u.email?.toLowerCase().includes(searchText)
              )
              .map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>

                  {/* USER INFO */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.photoURL} alt="" />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold">{user.displayName}</div>
                        <div className="text-sm opacity-50">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{user.email}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`badge ${
                        user.status === "approved"
                          ? "badge-success"
                          : user.status === "suspended"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {user.status}
                    </span>

                    {user.suspendReason && (
                      <p className="text-xs text-red-500">
                        ({user.suspendReason})
                      </p>
                    )}
                  </td>

                  {/* ROLE DROPDOWN */}
                  <td>
                    <select
                      defaultValue={user.role}
                      onChange={(e) => updateRole(user._id, e.target.value)}
                      className="select select-bordered"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="flex gap-2">
                    {user.status !== "approved" && (
                      <button
                        onClick={() => approveUser(user)}
                        className="btn btn-success btn-xs"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => suspendUser(user)}
                      className="btn btn-error btn-xs"
                    >
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
