import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { product_list, addToCart } = useContext(StoreContext);
  const product = product_list.find((p) => p._id === id);
  const navigate = useNavigate();

  if (!product)
    return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-3">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.desc}</p>
          <p className="text-2xl font-bold mb-4">₹{product.price}</p>
          <button
            onClick={() => {
              addToCart(product._id);
              navigate("/cart");
            }}
            className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
