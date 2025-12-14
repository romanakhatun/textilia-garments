import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["approved-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders?status=approved");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Approved Orders ({orders.length})
      </h2>

      {orders.map((o) => (
        <div key={o._id} className="border p-4 rounded mb-3">
          <h3 className="font-semibold">{o.productName}</h3>
          <p className="text-sm">
            {o.userEmail} • Qty: {o.quantity}
          </p>
        </div>
      ))}

      {orders.length === 0 && <p className="text-center">No approved orders</p>}
    </div>
  );
};

export default ApprovedOrders;
