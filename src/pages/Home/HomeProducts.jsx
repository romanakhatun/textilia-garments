import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductCard from "../../components/ProductCard";

const HomeProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/home");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner message="Product Loading ..." />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 flex items-center flex-col">
      <h2 className="section-heading text-center mb-8 highlight-title inline-block">
        Featured Products
      </h2>

      <p className="text-center text-base-content/70 max-w-xl mx-auto mb-12">
        Explore our top-quality garment items available for instant purchase or
        bulk orders.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default HomeProducts;
