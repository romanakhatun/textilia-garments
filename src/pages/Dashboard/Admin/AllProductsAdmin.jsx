import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const AllProductsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const handleDelete = async (product) => {
    const confirm = await Swal.fire({
      title: `Delete "${product.name}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.delete(`/products/${product._id}`);
    if (res.data.deletedCount > 0) {
      Swal.fire("Deleted", "Product removed.", "success");
      refetch();
    } else {
      Swal.fire("Error", "Delete failed.", "error");
    }
  };

  const toggleShowOnHome = async (product) => {
    const newVal = !product.showOnHome;
    const res = await axiosSecure.patch(`/products/${product._id}`, {
      showOnHome: newVal,
    });

    if (res.data.modifiedCount) {
      refetch();
    }
  };

  if (isLoading) return <p className="text-center py-20">Loading...</p>;

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Products (Admin)</h1>
          <p className="text-sm text-base-content/70">
            Manage products in the system
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name or category..."
            className="input input-bordered w-full md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/dashboard/add-product" className="btn btn-primary">
            Add Product
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p._id} className="hover:bg-base-200 transition">
                <td>{idx + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images?.[0]}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-md border"
                    />
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-base-content/60">
                        {p.description?.slice(0, 80)}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.availableQuantity}</td>

                <td>
                  <label className="cursor-pointer inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!p.showOnHome}
                      onChange={() => toggleShowOnHome(p)}
                      className="checkbox checkbox-sm"
                    />
                    <span className="text-sm">
                      {p.showOnHome ? "Yes" : "No"}
                    </span>
                  </label>
                </td>

                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/edit-product/${p._id}`}
                    className="btn btn-sm btn-info text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p)}
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

export default AllProductsAdmin;
