import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import LoadingSpinner from "../../../components/LoadingSpinner";

const STEP_LABELS = {
  cutting_completed: "Cutting Completed",
  sewing_started: "Sewing Started",
  finishing: "Finishing",
  qc_checked: "QC Checked",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
};

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: steps = [], isLoading } = useQuery({
    queryKey: ["track-order", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${orderId}`);
      return res.data;
    },
  });

  if (isLoading)
    return <LoadingSpinner message="Loading tracking info..."></LoadingSpinner>;

  const latestIndex = steps.length - 1;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Order Tracking</h2>

      <ul className="timeline timeline-vertical">
        {steps.map((step, idx) => (
          <li key={step._id}>
            <div
              className={`timeline-start ${
                idx === latestIndex ? "text-success font-bold" : ""
              }`}
            >
              {new Date(step.timestamp).toLocaleString()}
            </div>

            <div className="timeline-middle">
              <span
                className={`badge ${
                  idx === latestIndex ? "badge-success" : "badge-outline"
                }`}
              >
                {idx + 1}
              </span>
            </div>

            <div
              className={`timeline-end p-4 rounded border ${
                idx === latestIndex ? "border-success bg-success/10" : ""
              }`}
            >
              <p className="font-medium">
                {STEP_LABELS[step.status] || step.status}
              </p>

              {step.location && (
                <p className="text-sm">Location: {step.location}</p>
              )}

              {step.note && (
                <p className="text-sm opacity-80 mt-1">{step.note}</p>
              )}
            </div>

            <hr />
          </li>
        ))}
      </ul>

      {steps.length === 0 && (
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold">Tracking Not Started</h2>
          <p className="text-sm opacity-70">
            Your order has not entered production yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
