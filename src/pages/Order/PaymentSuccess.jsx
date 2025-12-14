import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const res = await axiosSecure.post("/orders/confirm-payment", {
          sessionId,
        });

        if (res.data.insertedId) {
          Swal.fire("Success", "Order placed successfully", "success");
          navigate("/dashboard/my-orders");
        }
      } catch {
        Swal.fire("Error", "Order save failed", "error");
      }
    };

    if (sessionId) confirmPayment();
  }, [sessionId, axiosSecure, navigate]);

  return <p className="text-center py-20">Confirming payment...</p>;
};

export default PaymentSuccess;
