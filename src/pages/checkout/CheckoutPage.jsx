import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import OrderSuccessPopup from "../../modals/OrderSuccessPopup";
import GlobalHero from "../../components/GlobalHero";

const CheckoutPage = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  // Error state
  const [errors, setErrors] = useState({});

  // Regex patterns
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const postalCodeRegex = /^\d{6}$/;

  // --- Real-Time Validation Function ---
  const validateField = (field, value) => {
    let message = "";

    switch (field) {
      case "name":
        if (!nameRegex.test(value)) message = "Enter a valid full name";
        break;
      case "email":
        if (!emailRegex.test(value)) message = "Enter a valid email address";
        break;
      case "phone":
        if (!phoneRegex.test(value))
          message = "Enter a valid 10-digit phone number";
        break;
      case "address":
        if (value.trim().length < 5) message = "Address is too short";
        break;
      case "city":
        if (value.trim().length < 2) message = "Enter a valid city name";
        break;
      case "postalCode":
        if (!postalCodeRegex.test(value))
          message = "Enter a valid 6-digit postal code";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  // --- Full Form Validation ---
  const validateForm = () => {
    const fields = { name, email, phone, address, city, postalCode };
    const newErrors = {};

    Object.entries(fields).forEach(([key, value]) => {
      validateField(key, value);
      if (
        (key === "name" && !nameRegex.test(value)) ||
        (key === "email" && !emailRegex.test(value)) ||
        (key === "phone" && !phoneRegex.test(value)) ||
        (key === "address" && value.trim().length < 5) ||
        (key === "city" && value.trim().length < 2) ||
        (key === "postalCode" && !postalCodeRegex.test(value))
      ) {
        newErrors[key] = true;
      }
    });

    return Object.keys(newErrors).length === 0;
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
      setSaveAddress(false);
      setErrors({});
    }
  };

  const totalAmount = getTotalCartAmount();
  const savedAmount = totalAmount * 0.1;
  const numberOfProducts = Object.keys(cartItems || {}).length;

  return (
    <>
      {/* <GlobalHero /> */}

      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 grid-cols-1 mt-16 md:gap-16 gap-10">
            {/* Shipping Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white px-4 py-5 md:px-8 md:py-10 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-5 text-gray-800">
                Shipping Details
              </h2>

              <div className="space-y-4">
                <div className="flex gap-3 w-full">
                  {/* Name */}
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        validateField("name", e.target.value);
                      }}
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

                  {/* Email */}
                  <div className="w-full">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateField("email", e.target.value);
                      }}
                      className={`border p-3 rounded w-full focus:ring-2 outline-none ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-yellow-500"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      validateField("phone", e.target.value);
                    }}
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

                {/* Address */}
                <div>
                  <textarea
                    placeholder="Address"
                    rows="3"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      validateField("address", e.target.value);
                    }}
                    className={`border p-3 rounded w-full focus:ring-2 outline-none resize-none ${
                      errors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 w-full">
                  {/* City */}
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        validateField("city", e.target.value);
                      }}
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

                  {/* Postal Code */}
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                        validateField("postalCode", e.target.value);
                      }}
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

                {/* Save Address */}
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

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="mt-6 cursor-pointer bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 w-full transition font-semibold"
                >
                  Place Order
                </button>
              </div>
            </form>

            {/* Order Summary */}
            <div className="px-4 py-5 md:px-8 md:py-10 bg-white h-max shadow-lg rounded-2xl">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">
                Order Summary
              </h2>

              <div className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-300">
                <div className="flex justify-between text-gray-700">
                  <span>Products:</span>
                  <span>{numberOfProducts}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Saved Amount:</span>
                  <span className="text-green-600 font-medium">
                    ₹{savedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showPopup && <OrderSuccessPopup onClose={() => setShowPopup(false)} />}
      </section>
    </>
  );
};

export default CheckoutPage;
