import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ORDER_STATUSES = ["pending", "approved", "rejected"];

const AllOrdersAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-all-orders", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });
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

  const viewTracking = async (orderId) => {
    const res = await axiosSecure.get(`/tracking/${orderId}`);

    const timeline = res.data
      .map(
        (t) => `
        <div>
          <b>${t.status}</b><br/>
          <small>${new Date(t.timestamp).toLocaleString()}</small><br/>
          ${t?.location || ""} ${t.note ? "• " + t.note : ""}
        </div>
      `
      )
      .join("");

    Swal.fire({
      title: "Tracking Timeline",
      html: timeline || "<p>No tracking updates</p>",
      width: 600,
    });
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
                        : o.status === "rejected"
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
                      onClick={() => viewTracking(o._id)}
                      className="btn btn-xs btn-ghost"
                    >
                      View Tracking
                    </button>
                    <button
                      onClick={() => viewOrderDetails(o)}
                      className="btn btn-xs btn-outline"
                    >
                      View Details
                    </button>
                  </div>
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
