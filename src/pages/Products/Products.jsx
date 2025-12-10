import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch all products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  // FILTER BY SEARCH
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-4xl font-extrabold text-base-content">
          All Products
        </h1>

        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full md:w-72"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold text-base-content/60">
            No products found.
          </h2>
        </div>
      )}
    </section>
  );
};

export default AllProducts;
