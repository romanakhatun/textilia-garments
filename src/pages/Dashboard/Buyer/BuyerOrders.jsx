import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import LoadingSpinner from "../../../components/LoadingSpinner";

const BuyerOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/user/${user.email}`);
      return res.data;
    },
  });
  console.log(orders);

  const handleCancel = async (order) => {
    if (order.status !== "pending") {
      return Swal.fire(
        "Cannot cancel",
        "Only pending orders can be cancelled",
        "info"
      );
    }

    const confirmed = await Swal.fire({
      title: "Cancel order?",
      text: `Order ${order._id} will be cancelled.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (!confirmed.isConfirmed) return;

    const res = await axiosSecure.patch(`/orders/${order._id}/status`, {
      status: "cancelled",
    });

    if (res.data.modifiedCount || res.status === 200) {
      Swal.fire("Cancelled", "Order cancelled successfully", "success");
      refetch();
    } else {
      Swal.fire("Error", "Cancel failed", "error");
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading..." />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders ({orders.length})</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 border rounded-lg bg-base-100 flex flex-col md:flex-row justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold text-lg">{order.productName}</h3>
              <p className="text-sm text-base-content/70">
                Qty: {order.quantity} • Total: ${order.orderTotal}
              </p>
              <p className="text-sm mt-2">Payment: {order.paymentStatus}</p>
              <p className="text-sm">
                Ordered: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span
                className={`badge ${
                  order.status === "pending"
                    ? "badge-warning"
                    : order.status === "cancelled"
                    ? "badge-error"
                    : "badge-success"
                }`}
              >
                {order.status}
              </span>

              <div className="flex gap-2">
                <Link
                  to={`/dashboard/track-order/${order._id}`}
                  className="btn btn-sm"
                >
                  Track
                </Link>

                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order)}
                    className="btn btn-sm btn-ghost"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="p-8 text-center text-base-content/70">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOrders;
