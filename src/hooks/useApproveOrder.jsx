import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const useApproveOrder = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const approve = async (orderId) => {
    const confirm = await Swal.fire({
      title: "Approve this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });
    if (!confirm.isConfirmed) return null;

    const res = await axiosSecure.patch(`/orders/${orderId}/status`, {
      status: "approved",
    });
    if (res.data.modifiedCount || res.status === 200) {
      Swal.fire("Approved", "Order approved successfully", "success");
      qc.invalidateQueries(["pending-orders"]);
      qc.invalidateQueries(["admin-all-orders"]);
    } else {
      Swal.fire("Error", "Approve failed", "error");
    }
    return res;
  };

  return { approve };
};

export default useApproveOrder;
