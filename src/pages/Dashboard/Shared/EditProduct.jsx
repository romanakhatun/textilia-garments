import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  // Fetch product by id
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        price: product.price,
        paymentOption: product.paymentOption,
        images: product.images?.join(", "),
        demoVideo: product.demoVideo,
        description: product.description,
      });
    }
  }, [product, reset]);

  const handleUpdateProduct = async (data) => {
    const updatedProduct = {
      ...data,
      price: parseFloat(data.price),
      images: data.images
        ? data.images.split(",").map((img) => img.trim())
        : [],
    };

    const confirm = await Swal.fire({
      title: "Update Product?",
      text: "Are you sure you want to update this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/products/${id}`, updatedProduct);

    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Product updated successfully.", "success");
      navigate("/dashboard/manage-products");
    }
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading product...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-base-100 p-10 rounded-xl shadow my-10">
      <h1 className="text-3xl font-extrabold mb-2">Edit Product</h1>
      <p className="text-base-content/70 mb-8">Update product information</p>

      <form onSubmit={handleSubmit(handleUpdateProduct)} className="space-y-8">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-4">
            <div>
              <label className="label font-medium">Product Name</label>
              <input
                {...register("name")}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-medium">Category</label>
              <select
                {...register("category")}
                className="select select-bordered w-full"
              >
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Blazer</option>
                <option>Sportswear</option>
                <option>Kids Wear</option>
              </select>
            </div>

            <div>
              <label className="label font-medium">Price</label>
              <input
                type="number"
                {...register("price")}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div>
              <label className="label font-medium">Payment Option</label>
              <select
                {...register("paymentOption")}
                className="select select-bordered w-full"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayFast">PayFast</option>
              </select>
            </div>

            <div>
              <label className="label font-medium">
                Images (comma separated)
              </label>
              <input
                {...register("images")}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-medium">Demo Video</label>
              <input
                {...register("demoVideo")}
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="label font-medium">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
