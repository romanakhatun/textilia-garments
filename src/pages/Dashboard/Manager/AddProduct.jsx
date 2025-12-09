import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Include formState to access validation errors
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.price = parseFloat(data.price);
    data.availableQuantity = parseInt(data.availableQuantity);
    data.minimumOrderQuantity = parseInt(data.minimumOrderQuantity);
    data.images = data.images.split(",").map((img) => img.trim());
    data.showOnHome = data.showOnHome === "true";
    data.createdBy = user?.email;

    Swal.fire({
      title: "Confirm Product Creation",
      text: "Are you sure you want to create this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Create",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/products", data);
        if (res.data.insertedId) {
          Swal.fire("Success!", "Product Added Successfully!", "success");
          reset();
        }
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-base-100 p-10 rounded-2xl shadow my-20">
      <h1 className="text-4xl font-extrabold text-base-content">
        Add New Product
      </h1>
      <p className="mt-2 text-base-content/70">
        Fill in the product details below
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-10">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="label font-medium">Product Name</label>
              <input
                type="text"
                {...register("name", { required: "Product name is required" })}
                placeholder="Product Name"
                className="input input-bordered w-full bg-base-100"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="label font-medium">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="select select-bordered w-full bg-base-100"
              >
                <option value="">Select Category</option>
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Blazer</option>
                <option>Sportswear</option>
                <option>Kids Wear</option>
              </select>
              {errors.category && (
                <p className="text-error text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Available Quantity */}
            <div>
              <label className="label font-medium">Available Quantity</label>
              <input
                type="number"
                {...register("availableQuantity", {
                  required: "Available quantity is required",
                  min: { value: 1, message: "Minimum quantity is 1" },
                })}
                placeholder="Available Quantity"
                className="input input-bordered w-full bg-base-100"
              />
              {errors.availableQuantity && (
                <p className="text-error text-sm mt-1">
                  {errors.availableQuantity.message}
                </p>
              )}
            </div>

            {/* Payment Option */}
            <div>
              <label className="label font-medium">Payment Option</label>
              <select
                {...register("paymentOption", {
                  required: "Payment option is required",
                })}
                className="select select-bordered w-full bg-base-100"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayFast">PayFast</option>
              </select>
              {errors.paymentOption && (
                <p className="text-error text-sm mt-1">
                  {errors.paymentOption.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="label font-medium">Price</label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                placeholder="Product Price"
                className="input input-bordered w-full bg-base-100"
              />
              {errors.price && (
                <p className="text-error text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Minimum Order Quantity */}
            <div>
              <label className="label font-medium">
                Minimum Order Quantity
              </label>
              <input
                type="number"
                {...register("minimumOrderQuantity", {
                  required: "Minimum order quantity required",
                })}
                placeholder="Minimum Order Qty"
                className="input input-bordered w-full bg-base-100"
              />
              {errors.minimumOrderQuantity && (
                <p className="text-error text-sm mt-1">
                  {errors.minimumOrderQuantity.message}
                </p>
              )}
            </div>

            {/* Product Images */}
            <div>
              <label className="label font-medium">Product Images</label>
              <input
                type="text"
                {...register("images", {
                  required: "At least one image URL is required",
                })}
                placeholder="image1URL, image2URL"
                className="input input-bordered w-full bg-base-100"
              />
              {errors.images && (
                <p className="text-error text-sm mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>

            {/* Demo Video */}
            <div>
              <label className="label font-medium">Demo Video</label>
              <input
                type="text"
                {...register("demoVideo")}
                placeholder="Video Link"
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="label font-medium">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Description"
                className="textarea textarea-bordered w-full bg-base-100"
                rows={5}
              ></textarea>
              {errors.description && (
                <p className="text-error text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SHOW ON HOME */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("showOnHome")}
            value="true"
            className="checkbox"
          />
          <span className="font-medium">Show on Home Page</span>
        </div>

        <button className="btn-primary w-full mx-auto" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
