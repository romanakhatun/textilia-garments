// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const ApprovedOrders = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ["approved-orders"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/orders?status=approved");
//       return res.data;
//     },
//   });

//   const addTracking = async (order) => {
//     const { value } = await Swal.fire({
//       title: "Add Tracking Update",
//       html: `
//         <select id="status" class="swal2-input">
//           <option value="">Select Status</option>
//           <option value="cutting_completed">Cutting Completed</option>
//           <option value="sewing_started">Sewing Started</option>
//           <option value="finishing">Finishing</option>
//           <option value="qc_checked">QC Checked</option>
//           <option value="packed">Packed</option>
//           <option value="shipped">Shipped</option>
//           <option value="out_for_delivery">Out for Delivery</option>
//         </select>
//         <input id="location" class="swal2-input" placeholder="Location (optional)">
//         <textarea id="note" class="swal2-textarea" placeholder="Note"></textarea>
//       `,
//       preConfirm: () => {
//         const status = document.getElementById("status").value;
//         if (!status) {
//           Swal.showValidationMessage("Status is required");
//         }
//         return {
//           status,
//           location: document.getElementById("location").value,
//           note: document.getElementById("note").value,
//         };
//       },
//       showCancelButton: true,
//     });

//     if (!value) return;

//     const res = await axiosSecure.post(`/tracking/${order._id}`, value);

//     if (res.data.insertedId) {
//       Swal.fire("Success", "Tracking added", "success");
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">
//         Approved Orders ({orders.length})
//       </h2>

//       {orders.map((o) => (
//         <div key={o._id} className="border p-4 rounded mb-3">
//           <h3 className="font-semibold">{o.productName}</h3>
//           <p className="text-sm">
//             {o.userEmail} • Qty: {o.quantity}
//           </p>
//           <p className="text-xs opacity-70">
//             Approved At: {new Date(o.approvedAt).toLocaleString()}
//           </p>

//           <button
//             onClick={() => addTracking(o)}
//             className="btn btn-sm btn-outline mt-2"
//           >
//             Add Tracking
//           </button>
//         </div>
//       ))}

//       {orders.length === 0 && <p className="text-center">No approved orders</p>}
//     </div>
//   );
// };

// export default ApprovedOrders;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["approved-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders?status=approved");
      return res.data;
    },
  });

  const addTracking = async (order) => {
    const { value } = await Swal.fire({
      title: "Add Tracking Update",
      html: `
        <select id="status" class="swal2-input">
          <option value="">Select Status</option>
          <option value="cutting_completed">Cutting Completed</option>
          <option value="sewing_started">Sewing Started</option>
          <option value="finishing">Finishing</option>
          <option value="qc_checked">QC Checked</option>
          <option value="packed">Packed</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">Out for Delivery</option>
        </select>
        <input id="location" class="swal2-input" placeholder="Location (optional)">
        <textarea id="note" class="swal2-textarea" placeholder="Note (optional)"></textarea>
      `,
      showCancelButton: true,
      preConfirm: () => {
        const status = document.getElementById("status").value;
        if (!status) {
          Swal.showValidationMessage("Status is required");
        }
        return {
          status,
          location: document.getElementById("location").value,
          note: document.getElementById("note").value,
        };
      },
    });

    if (!value) return;

    const res = await axiosSecure.post(`/tracking/${order._id}`, value);

    if (res.data.insertedId) {
      Swal.fire("Success", "Tracking update added", "success");
    }
  };

  const viewTracking = async (orderId) => {
    const res = await axiosSecure.get(`/tracking/${orderId}`);

    const timeline = res.data
      .map(
        (t) => `
        <div style="text-align:left;margin-bottom:8px;">
          <b>${t.status}</b><br/>
          <small>${new Date(t.timestamp).toLocaleString()}</small><br/>
          ${t.location || ""} ${t.note ? "• " + t.note : ""}
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

  if (isLoading) return <LoadingSpinner message="Loading..."></LoadingSpinner>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Approved Orders ({orders.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>User</th>
              <th>Quantity</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>

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
                <td>
                  {o.approvedAt
                    ? new Date(o.approvedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => addTracking(o)}
                    className="btn btn-xs btn-outline"
                  >
                    Add Tracking
                  </button>
                  <button
                    onClick={() => viewTracking(o._id)}
                    className="btn btn-xs btn-ghost"
                  >
                    View Tracking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center mt-6">No approved orders</p>
        )}
      </div>
    </div>
  );
};

export default ApprovedOrders;
