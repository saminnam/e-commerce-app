import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    product_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const cartProducts = product_list.filter((p) => cartItems[p._id]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500">₹{product.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{cartItems[product._id]}</span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(product._id)}
                className="text-red-600 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-xl font-bold">
              Total: ₹{getTotalCartAmount().toLocaleString()}
            </h2>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
