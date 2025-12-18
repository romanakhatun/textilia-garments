import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { MdDelete, MdEdit } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const ManageProducts = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all products
  const { data: products = [], refetch } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user?.email}`);
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = async (product) => {
    const confirm = await Swal.fire({
      title: `Delete "${product.name}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.delete(`/products/${product._id}`);

    if (res.data.deletedCount > 0) {
      Swal.fire("Deleted!", "Product removed successfully.", "success");
      refetch();
    }
  };

  console.log("manage Product", products);

  const filtered = products.filter((p) => {
    if (!search) return true;

    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-3xl font-bold mb-6">
          Manage Products ({products.length})
        </h1>
        <input
          type="text"
          placeholder="Search by product / category"
          className="input input-bordered w-full md:w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-base-100">
        <table className="table">
          <thead>
            <tr className="text-base-content font-semibold">
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Available</th>
              <th>Min Order</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((product, index) => (
              <tr key={product._id} className="hover:bg-base-200 transition">
                <td>{index + 1}</td>

                {/* PRODUCT */}
                <td>
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                    </div>
                  </div>
                </td>

                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.availableQuantity}</td>
                <td>{product.minimumOrderQuantity}</td>

                {/* Product Mode */}
                <td>
                  {product.paymentOption === "Cash on Delivery"
                    ? "COD"
                    : product.paymentOption}
                </td>

                {/* ACTION BUTTONS */}
                <td className="flex gap-3 items-center">
                  <Link
                    to={`/dashboard/edit-product/${product._id}`}
                    className="btn btn-sm btn-info text-white"
                  >
                    Edit
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(product)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-10 text-center text-base-content/70">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
