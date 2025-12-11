import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order, isLoading: loadingOrder } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => (await axiosSecure.get(`/orders/${orderId}`)).data,
  });

  const { data: logs = [], isLoading: loadingLogs } = useQuery({
    queryKey: ["tracking", order?.trackingId],
    enabled: !!order?.trackingId,
    queryFn: async () =>
      (await axiosSecure.get(`/tracking/${order.trackingId}`)).data,
  });

  if (loadingOrder || loadingLogs)
    return <LoadingSpinner message="Loading..." />;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Track Order: {order.trackingId}
      </h1>
      <p className="mb-6">Product: {order.productName}</p>

      <div className="timeline space-y-6">
        {logs
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((log, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full mt-2 bg-primary"></div>
              <div>
                <div className="font-semibold">{log.status}</div>
                <div className="text-sm text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
                {log.note && <div className="mt-2">{log.note}</div>}
                {log.location && (
                  <div className="text-sm text-gray-400">{log.location}</div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrackOrder;
