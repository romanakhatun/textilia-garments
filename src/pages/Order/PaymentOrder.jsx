import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const orderPayload = state?.orderPayload;

  if (!orderPayload) {
    navigate("/");
    return null;
  }

  const handlePayment = async () => {
    try {
      const res = await axiosSecure.post("/payment-checkout-session", {
        productId: orderPayload.productId,
        productName: orderPayload.productName,
        price: orderPayload.price,
        quantity: orderPayload.quantity,
        userEmail: orderPayload.userEmail,
      });

      window.location.href = res.data.url; //Redirect to Stripe
    } catch {
      Swal.fire("Error", "Unable to start payment", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-10 bg-base-100 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>

      <p>
        <strong>Product:</strong> {orderPayload.productName}
      </p>
      <p>
        <strong>Quantity:</strong> {orderPayload.quantity}
      </p>
      <p>
        <strong>Total:</strong> ${orderPayload.orderTotal}
      </p>

      <button onClick={handlePayment} className="btn btn-success w-full mt-6">
        Pay Now
      </button>

      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline w-full mt-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default Payment;
