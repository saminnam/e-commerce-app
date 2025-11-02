import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import OrderSuccessPopup from "../modals/OrderSuccessPopup";

const CheckoutPage = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);

  // Individual form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  // Coupon States
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // Error states
  const [errors, setErrors] = useState({});

  // Validation regex
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const postalCodeRegex = /^\d{6}$/;

  const totalAmount = getTotalCartAmount();
  const numberOfProducts = Object.keys(cartItems || {}).length;

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!nameRegex.test(name)) newErrors.name = "Enter a valid full name";
    if (!emailRegex.test(email))
      newErrors.email = "Enter a valid email address";
    if (!phoneRegex.test(phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (address.trim().length < 5) newErrors.address = "Address is too short";
    if (city.trim().length < 2) newErrors.city = "Enter a valid city name";
    if (!postalCodeRegex.test(postalCode))
      newErrors.postalCode = "Enter a valid 6-digit postal code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle coupon application
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    let discount = 0;
    let message = "";

    if (code === "SAVE10") {
      discount = totalAmount * 0.1;
      message = "🎉 Coupon applied: 10% off!";
    } else if (code === "FLAT500") {
      discount = 500;
      message = "🎉 Coupon applied: ₹500 off!";
    } else if (code === "WELCOME50") {
      discount = Math.min(totalAmount * 0.5, 1000);
      message = "🎉 Coupon applied: 50% off up to ₹1000!";
    } else if (code === "") {
      message = "Please enter a coupon code.";
    } else {
      message = "❌ Invalid coupon code.";
    }

    setDiscountAmount(discount);
    setCouponMessage(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPopup(true);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setPostalCode("");
      setCouponCode("");
      setDiscountAmount(0);
      setCouponMessage("");
    }
  };

  const finalAmount = Math.max(totalAmount - discountAmount, 0);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 grid-cols-1 mt-16 md:gap-16 gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white px-4 py-5 md:px-8 md:py-10 rounded-2xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-5 text-gray-800">
              Shipping Details
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3 w-full">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`border p-3 rounded w-full focus:ring-2 outline-none ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`border p-3 rounded w-full focus:ring-2 outline-none ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`border p-3 rounded w-full focus:ring-2 outline-none ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-500"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <textarea
                placeholder="Address"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`border p-3 rounded w-full focus:ring-2 outline-none resize-none ${
                  errors.address
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-yellow-500"
                }`}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}

              <div className="flex gap-3 w-full">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`border p-3 rounded w-full focus:ring-2 outline-none ${
                      errors.city
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className={`border p-3 rounded w-full focus:ring-2 outline-none ${
                      errors.postalCode
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer mt-3">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="w-4 h-4 text-yellow-500 border-gray-300 rounded"
                />
                <span className="text-gray-700 text-sm">
                  Save this address for future orders
                </span>
              </label>
            </div>
          </form>

          {/* Order Summary */}
          <div className="px-4 py-5 md:px-8 md:py-10 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">
              Order Summary
            </h2>

            <div className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-300">
              <div className="flex justify-between text-gray-700">
                <span>Products:</span>
                <span>{numberOfProducts}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Discount:</span>
                <span className="text-green-600 font-medium">
                  -₹{discountAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount:</span>
                <span>₹{finalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Coupon Input */}
            <div className="mt-5">
              <input
                type="text"
                placeholder="Enter your coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border border-gray-300 p-3 rounded-md w-full mb-3 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 w-full transition font-semibold"
              >
                Apply Coupon
              </button>
              {couponMessage && (
                <p
                  className={`mt-2 text-sm ${
                    couponMessage.includes("❌")
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {couponMessage}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 cursor-pointer bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 w-full transition font-semibold"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {showPopup && <OrderSuccessPopup onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default CheckoutPage;
