import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders?status=pending");
      return res.data;
    },
  });

  const changeStatus = async (orderId, newStatus) => {
    const confirm = await Swal.fire({
      title: `Set status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
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

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Pending Orders ({orders.length})
      </h2>

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o._id}
            className="p-4 border rounded-lg flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold">{o.productName}</h3>
              <p className="text-sm">
                {o.userEmail} • Qty: {o.quantity}
              </p>
              <p className="text-sm mt-2">{o.deliveryAddress}</p>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <button
                  onClick={() => changeStatus(o._id, "approved")}
                  className="btn btn-sm btn-success mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => changeStatus(o._id, "rejected")}
                  className="btn btn-sm btn-error"
                >
                  Reject
                </button>
              </div>

              <button
                onClick={async () => {
                  const res = await axiosSecure.get(`/orders/${o._id}`);
                  Swal.fire({
                    title: "Order Details",
                    html: `<div>Product: ${res.data.productName}</div><div>Qty: ${res.data.quantity}</div><div>Address: ${res.data.deliveryAddress}</div>`,
                    width: 600,
                  });
                }}
                className="btn btn-xs btn-ghost"
              >
                View
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="p-8 text-center text-base-content/70">
            No pending orders.
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;
