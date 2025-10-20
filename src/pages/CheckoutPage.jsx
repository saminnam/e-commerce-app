import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const CheckoutPage = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow"
      >
        <div>
          <h2 className="text-lg font-semibold mb-3">Shipping Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded w-full mb-3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full mb-3"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded w-full mb-3"
            required
          />
          <input
            type="text"
            placeholder="City"
            className="border p-2 rounded w-full mb-3"
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="border p-2 rounded w-full mb-3"
            required
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <p className="text-gray-600 mb-3">
            Total Amount:{" "}
            <span className="font-bold text-black">
              ₹{getTotalCartAmount().toLocaleString()}
            </span>
          </p>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 w-full"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
