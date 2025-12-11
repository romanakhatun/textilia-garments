import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import useRole from "../../hooks/useRole";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { role, status } = useRole();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });
  // console.log(product);

  if (isLoading) {
    return <LoadingSpinner message="Data Loading ..." />;
  }

  if (!product) {
    return (
      <p className="text-center py-20 text-xl text-error">Product Not Found!</p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <p className="text-sm text-base-content/60 mb-6">
        <Link to="/">Home</Link> / <Link to="/all-products">Products</Link> /{" "}
        <span className="font-semibold">{product.name}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* --- LEFT: Image Gallery --- */}
        <div>
          <div className="w-full h-80 rounded-xl overflow-hidden border">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {product.images?.map((img, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-md overflow-hidden border cursor-pointer hover:opacity-75 transition"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: Product Info --- */}
        <div>
          <h1 className="text-4xl font-extrabold text-base-content mb-3">
            {product.name}
          </h1>

          <p className="text-secondary text-lg font-medium">
            Category: {product.category}
          </p>

          <p className="text-3xl font-bold text-primary mt-4">
            ${product.price}
          </p>

          <div className="mt-6 space-y-2 text-base-content/80">
            <p>
              <span className="font-semibold">Available Quantity:</span>{" "}
              {product.availableQuantity}
            </p>

            <p>
              <span className="font-semibold">Minimum Order Quantity:</span>{" "}
              {product.minimumOrderQuantity}
            </p>
            <p>
              <span className="font-semibold">Payment:</span>{" "}
              <span className="badge">{product.paymentOption}</span>
            </p>
          </div>

          {/* Description */}
          <p className="mt-6 text-base-content/90 leading-relaxed">
            {product.description}
          </p>

          {/* Demo Video */}
          {product.demoVideo && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">Demo Video</h3>
              <iframe
                className="w-full h-64 rounded-xl"
                src={product.demoVideo}
                title="Product Video"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Order Button */}

          <button
            disabled={role !== "buyer" || status === "suspended"}
            className="btn btn-primary w-full mt-10"
          >
            <Link to={`/order/${product._id}`}>Order Now</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
