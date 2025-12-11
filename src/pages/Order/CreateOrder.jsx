import { useEffect, useMemo } from "react";
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

  // Fetch product details
  const { data: product, isLoading: loadingProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      productTitle: product?.name || "",
      price: product?.price || 0,
      firstName: "",
      lastName: "",
      quantity: product?.minimumOrderQuantity || 1,
      contactNumber: "",
      deliveryAddress: "",
      notes: "",
    },
  });
  const watchedQuantity = watch("quantity", product?.minimumOrderQuantity || 1);
  const watchedPrice = watch("price", product?.price || 0);

  const orderTotal = useMemo(() => {
    const q = Number(watchedQuantity) || 0;
    const p = Number(watchedPrice) || 0;
    return (q * p).toFixed(2);
  }, [watchedQuantity, watchedPrice]);

  useEffect(() => {}, [product]);

  const validateQuantity = (value) => {
    const quantity = Number(value);
    if (quantity <= 0) return "Enter a valid quantity";
    if (quantity < product.minimumOrderQuantity)
      return `Minimum order is ${product.minimumOrderQuantity}`;
    if (quantity > product.availableQuantity)
      return `Cannot order more than available (${product.availableQuantity})`;
    return true;
  };

  const onSubmit = async (formData) => {
    const v = validateQuantity(formData.quantity);
    if (v !== true) {
      setError("quantity", { type: "manual", message: v });
      return;
    } else {
      clearErrors("quantity");
    }

    const orderPayload = {
      userEmail: user.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      productId: product._id,
      productName: product.name,
      price: Number(product.price),
      quantity: Number(formData.quantity),
      orderTotal: Number(
        (Number(product.price) * Number(formData.quantity)).toFixed(2)
      ),
      contactNumber: formData.contactNumber,
      deliveryAddress: formData.deliveryAddress,
      notes: formData.notes || "",
      paymentStatus: product.paymentOption === "PayFast" ? "pending" : "COD", // adjust if needed
      status: "pending", // initial order status
      createdAt: new Date(),
    };

    // Confirmation
    const result = await Swal.fire({
      title: "Confirm Order?",
      html: `
        <strong>Product:</strong> ${orderPayload.productName} <br/>
        <strong>Quantity:</strong> ${orderPayload.quantity} <br/>
        <strong>Total:</strong> $${orderPayload.orderTotal}
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Place Order",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.post("/orders", orderPayload);
      if (res.data.insertedId) {
        await Swal.fire("Success", "Order created successfully!", "success");
        navigate("/dashboard/my-orders");
      } else {
        Swal.fire("Error", "Failed to create order. Try again.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error. Try again later.", "error");
    }
  };

  if (loadingProduct)
    return <p className="text-center py-20">Loading product...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-base-100 shadow rounded-2xl p-8 my-12">
      <h2 className="text-2xl font-bold mb-4">Place Order</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Product</label>
            <input
              value={product.name}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div>
            <label className="label">Unit Price</label>
            <input
              value={product.price}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">First Name</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className={`input input-bordered w-full ${
                errors.firstName ? "input-error" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Last Name</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className={`input input-bordered w-full ${
                errors.lastName ? "input-error" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Quantity & Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Order Quantity</label>
            <Controller
              name="quantity"
              control={control}
              defaultValue={product.minimumOrderQuantity}
              rules={{ validate: validateQuantity }}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  min={product.minimumOrderQuantity}
                  max={product.availableQuantity}
                  className={`input input-bordered w-full ${
                    errors.quantity ? "input-error" : ""
                  }`}
                />
              )}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500 mt-1">
                {errors.quantity.message}
              </p>
            )}
            <p className="text-sm text-base-content/60 mt-2">
              Min: {product.minimumOrderQuantity} • Available:{" "}
              {product.availableQuantity}
            </p>
          </div>

          <div>
            <label className="label">Order Total (USD)</label>
            <input
              value={orderTotal}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </div>

        {/* Contact & Address */}
        <div>
          <label className="label">Contact Number</label>
          <input
            {...register("contactNumber", {
              required: "Contact number is required",
            })}
            className={`input input-bordered w-full ${
              errors.contactNumber ? "input-error" : ""
            }`}
          />
          {errors.contactNumber && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Delivery Address</label>
          <textarea
            {...register("deliveryAddress", {
              required: "Delivery address is required",
            })}
            rows={2}
            className={`textarea textarea-bordered w-full ${
              errors.deliveryAddress ? "textarea-error" : ""
            }`}
          />
          {errors.deliveryAddress && (
            <p className="text-sm text-red-500 mt-1">
              {errors.deliveryAddress.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Additional Notes (optional)</label>
          <textarea
            {...register("notes")}
            rows={3}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? "Placing..." : "Place Order"}
          </button>

          <p className="text-sm text-red-500">
            {!product ||
              (product.availableQuantity === 0 && "Product out of stock")}
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
