import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateOrder = () => {
  const { id: productId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const quantity = watch("quantity", product?.minimumOrderQuantity || 1);

  const orderTotal = useMemo(() => {
    return ((product?.price || 0) * Number(quantity || 0)).toFixed(2);
  }, [quantity, product]);

  const validateQuantity = (value) => {
    const q = Number(value);
    if (q < product.minimumOrderQuantity)
      return `Minimum order ${product.minimumOrderQuantity}`;
    if (q > product.availableQuantity)
      return `Max available ${product.availableQuantity}`;
    return true;
  };

  const onSubmit = async (data) => {
    const valid = validateQuantity(data.quantity);
    if (valid !== true) {
      setError("quantity", { message: valid });
      return;
    }
    clearErrors("quantity");

    const orderPayload = {
      userEmail: user.email,
      firstName: data.firstName,
      lastName: data.lastName,
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity: Number(data.quantity),
      orderTotal: Number(orderTotal),
      contactNumber: data.contactNumber,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes || "",
      paymentOption: product.paymentOption,
      status: "pending",
      createdAt: new Date(),
    };

    if (product.paymentOption === "PayFast") {
      navigate("/payment", {
        state: { orderPayload },
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirm Order?",
      text: `Total $${orderTotal}`,
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.post("/orders", {
        ...orderPayload,
        paymentStatus: "COD",
      });
      Swal.fire("Success", "Order placed successfully", "success");
      navigate("/dashboard/my-orders");
    } catch {
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  if (isLoading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-100 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Place Order</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          value={product.name}
          readOnly
          className="input w-full cursor-not-allowed"
        />

        <input
          value={user.email}
          readOnly
          className="input w-full cursor-not-allowed"
        />

        <input
          {...register("firstName", { required: true })}
          placeholder="First Name"
          className="input w-full"
        />

        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
          className="input w-full"
        />

        <Controller
          name="quantity"
          control={control}
          defaultValue={product.minimumOrderQuantity}
          rules={{ validate: validateQuantity }}
          render={({ field }) => (
            <input type="number" {...field} className="input w-full" />
          )}
        />

        {errors.quantity && (
          <p className="text-red-500">{errors.quantity.message}</p>
        )}

        <input
          value={`$${orderTotal}`}
          readOnly
          className="input w-full cursor-not-allowed"
        />

        <input
          {...register("contactNumber", { required: true })}
          placeholder="Contact Number"
          className="input w-full"
        />

        <textarea
          {...register("deliveryAddress", { required: true })}
          placeholder="Delivery Address"
          className="textarea w-full"
        />

        <textarea
          {...register("notes")}
          placeholder="Additional Notes (optional)"
          rows={3}
          className="textarea w-full"
        />

        <button className="btn btn-primary w-full" disabled={isSubmitting}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
