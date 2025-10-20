import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(StoreContext);

  return (
    <div className="border rounded-xl shadow hover:shadow-lg p-4 transition bg-white">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </Link>
      <p className="text-gray-700 mt-1 mb-2">₹{product.price}</p>
      <button
        onClick={() => addToCart(product._id)}
        className="bg-yellow-500 text-white w-full py-2 rounded-md hover:bg-yellow-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
