import { Link } from "react-router";

const ProductCard = ({ product }) => {
  // console.log(product);

  return (
    <div className="border rounded-xl bg-base-100 shadow hover:shadow-lg transition p-5">
      {/* Image */}
      <div className="h-52 w-full overflow-hidden rounded-lg">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <h3 className="text-primary text-xl font-bold mt-4">{product.name}</h3>
      <p className="text-secondary font-medium mt-1">{product.category}</p>

      <div className="flex justify-between mt-2">
        <span className="text-lg font-semibold text-primary">
          ${product.price}
        </span>
        <span className="text-sm text-primary">
          Available: {product.availableQuantity}
        </span>
      </div>

      {/* Button */}
      <Link
        to={`/product/${product._id}`}
        className="btn btn-primary w-full mt-4"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
