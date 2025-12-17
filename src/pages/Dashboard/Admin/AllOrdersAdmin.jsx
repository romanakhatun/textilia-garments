import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ORDER_STATUSES = [
  "pending",
  "approved",
  "in_production",
  "qc_checked",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "rejected",
];

const AllOrdersAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-all-orders", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  const updateOrderStatus = async (orderId, newStatus) => {
    const confirm = await Swal.fire({
      title: `Change status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/orders/${orderId}/status`, {
      status: newStatus,
    });

    if (res.data.modifiedCount || res.status === 200) {
      Swal.fire("Updated", "Order status updated", "success");
      refetch();
    } else {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const viewOrderDetails = async (order) => {
    const html = `
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Product:</strong> ${order.productName}</p>
      <p><strong>Qty:</strong> ${order.quantity}</p>
      <p><strong>Total:</strong> $${order.orderTotal}</p>
      <p><strong>Payment:</strong> ${order.paymentStatus}</p>
      <p><strong>Delivery Addr:</strong> ${order.deliveryAddress}</p>
    `;

    Swal.fire({
      title: "Order Details",
      html,
      width: 700,
    });
  };

  const addTrackingLog = async (order) => {
    const { value: formValues } = await Swal.fire({
      title: `Add tracking update for ${order._id}`,
      html:
        '<input id="sw-status" class="swal2-input" placeholder="status (e.g. cutting_completed)">' +
        '<input id="sw-location" class="swal2-input" placeholder="location (optional)">' +
        '<textarea id="sw-note" class="swal2-textarea" placeholder="note (optional)"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const status = document.getElementById("sw-status").value;
        const location = document.getElementById("sw-location").value;
        const note = document.getElementById("sw-note").value;
        if (!status) {
          Swal.showValidationMessage("Status is required");
        }
        return { status, location, note };
      },
    });

    if (!formValues) return;

    const payload = {
      status: formValues.status,
      location: formValues.location,
      note: formValues.note,
      createdAt: new Date(),
    };

    const res = await axiosSecure.post(
      `/tracking/${order.trackingId}`,
      payload
    );

    if (res.data.insertedId) {
      Swal.fire("Added", "Tracking update added", "success");
      refetch();
    } else {
      Swal.fire("Error", "Failed to add tracking update", "error");
    }
  };

  const filtered = orders
    .filter((o) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        o.productName?.toLowerCase().includes(q) ||
        o.userEmail?.toLowerCase().includes(q) ||
        o._id?.toString().toLowerCase().includes(q) ||
        o.trackingId?.toLowerCase().includes(q)
      );
    })
    .filter((o) => (statusFilter ? o.status === statusFilter : true));

  if (isLoading) return <LoadingSpinner message="Loading..." />;

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Orders (Admin)</h1>
          <p className="text-sm text-base-content/70">
            Manage and track all orders
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by product / email / order id..."
            className="input input-bordered w-full md:w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Order</th>
              <th>User</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Tracking</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((o, idx) => (
              <tr key={o._id} className="hover:bg-base-200 transition">
                <td>{idx + 1}</td>
                <td>
                  <div className="font-semibold">{o.productName}</div>
                  <div className="text-sm text-base-content/60">
                    ID: {o._id}
                  </div>
                </td>

                <td>
                  <div>{o.userEmail}</div>
                  <div className="text-sm opacity-60">{o.contactNumber}</div>
                </td>

                <td>{o.quantity}</td>
                <td>${o.orderTotal}</td>

                <td>
                  <span
                    className={`badge ${
                      o.status === "approved"
                        ? "badge-success"
                        : o.status === "suspended" ||
                          o.status === "cancelled" ||
                          o.status === "rejected"
                        ? "badge-error"
                        : "badge-info"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm">{o.trackingId}</div>
                    <button
                      onClick={() => addTrackingLog(o)}
                      className="btn btn-xs btn-ghost"
                    >
                      Add Tracking
                    </button>
                    <button
                      onClick={() => viewOrderDetails(o)}
                      className="btn btn-xs btn-outline"
                    >
                      View
                    </button>
                  </div>
                </td>

                <td className="flex gap-2">
                  <select
                    className="select select-bordered select-sm"
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-10 text-center text-base-content/70">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrdersAdmin;
