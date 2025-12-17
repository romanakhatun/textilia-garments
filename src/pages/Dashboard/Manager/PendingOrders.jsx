import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";

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
  // console.log(orders);

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

  const handleViewOrders = async (id) => {
    const res = await axiosSecure.get(`/orders/${id}`);
    Swal.fire({
      title: "Order Details",
      html: `
        <div>
          <p><b>Product:</b> ${res.data.productName}</p>
          <p><b>Quantity:</b> ${res.data.quantity}</p>
          <p><b>Address:</b> ${res.data.deliveryAddress}</p>
          <p><b>User:</b> ${res.data.userEmail}</p>
        </div>
      `,
      width: 500,
    });
  };
  if (isLoading) return <LoadingSpinner message="Loading..." />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Pending Orders ({orders.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* TABLE HEAD */}
          <thead>
            <tr>
              <th>#</th>
              <th>Produtc</th>
              <th>User</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {orders.map((o, index) => (
              <tr key={o._id}>
                <td>{index + 1}</td>

                <td className="text-base flex flex-col">
                  <span>{o.productName}</span>
                  <span className="text-xs">{o._id}</span>
                </td>

                <td>{o.userEmail}</td>

                <td>{o.quantity}</td>
                <td className="text-sm">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() => changeStatus(o._id, "approved")}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => changeStatus(o._id, "rejected")}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleViewOrders(o._id)}
                    className="btn btn-xs btn-ghost"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-base-content/70"
                >
                  No pending orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
