import { useEffect, useState, useContext } from "react";
import { useProfile } from "../../context/ProfileContext";
import { StoreContext } from "../../context/StoreContext";
import { createOrder } from "../../services/orderService";
import { product_list } from "../../data/productData";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Hash,
  CreditCard,
} from "lucide-react";

const CheckoutPage = () => {
  /* ---------------- CONTEXT ---------------- */
  const { profile, updateProfile } = useProfile();
  const { cartItems, getTotalCartAmount, clearCart } = useContext(StoreContext);

  /* ---------------- STATE ---------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});
  const [saveAddress, setSaveAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- PREFILL FROM PROFILE ---------------- */
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        postalCode: profile.postalCode || "",
      });
    }
  }, [profile]);

  /* ---------------- VALIDATION ---------------- */
  const regex = {
    name: /^[a-zA-Z.\s]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9]\d{9}$/,
    postalCode: /^\d{6}$/,
  };

  const validateForm = () => {
    let newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      let message = "";

      switch (key) {
        case "name":
          if (!regex.name.test(value)) message = "Enter a valid full name";
          break;
        case "email":
          if (!regex.email.test(value)) message = "Enter a valid email";
          break;
        case "phone":
          if (!regex.phone.test(value))
            message = "Enter valid 10-digit mobile number";
          break;
        case "address":
          if (value.trim().length < 5) message = "Address is too short";
          break;
        case "city":
          if (value.trim().length < 2) message = "Enter a valid city";
          break;
        case "postalCode":
          if (!regex.postalCode.test(value))
            message = "Enter valid 6-digit pincode";
          break;
        default:
          break;
      }

      if (message) newErrors[key] = message;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- CART → ORDER SUMMARY ---------------- */
  const orderProducts = Object.keys(cartItems || {})
    .map((id) => {
      const product = product_list.find(
        (item) => String(item._id) === String(id),
      );

      if (!product || cartItems[id] === 0) return null;

      return {
        ...product,
        quantity: cartItems[id],
        total: product.price * cartItems[id],
      };
    })
    .filter(Boolean);

  const totalItems = orderProducts.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const totalMRP = orderProducts.reduce(
    (sum, item) => sum + item.mrp * item.quantity,
    0,
  );

  const totalPrice = orderProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const savedAmount = totalMRP - totalPrice;
  const totalAmount = getTotalCartAmount();

  /* ---------------- PLACE ORDER ---------------- */
  const placeOrder = async () => {
    if (!orderProducts.length) {
      alert("Cart is empty");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (saveAddress) {
        await updateProfile(form);
      }

      await createOrder({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: {
          street: form.address,
          city: form.city,
          postalCode: form.postalCode,
        },
        products: orderProducts.map((p) => ({
          productId: p._id,
          productName: p.name,
          quantity: p.quantity,
          price: p.price,
        })),
        totalAmount,
      });

      // clearCart && clearCart(); 
      alert("🎉 Order placed successfully");
    } catch (error) {
      console.error(error);
      alert("❌ Order failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI FIELDS ---------------- */
  const fields = [
    { key: "name", icon: User, label: "Full Name" },
    { key: "email", icon: Mail, label: "Email Address" },
    { key: "phone", icon: Phone, label: "Mobile Number" },
    { key: "address", icon: MapPin, label: "Address", textarea: true },
    { key: "city", icon: Building, label: "City" },
    { key: "postalCode", icon: Hash, label: "Postal Code" },
  ];

  /* ---------------- JSX ---------------- */
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-yellow-500" />
            <h2 className="text-2xl font-bold">Shipping Details</h2>
          </div>

          <div className="space-y-5">
            {fields.map(({ key, icon: Icon, label, textarea, disabled }) => (
              <div key={key}>
                <label className="text-sm font-medium text-gray-600">
                  {label}
                </label>

                <div
                  className={`mt-1 flex gap-3 border rounded-lg px-4 py-3 ${
                    errors[key] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <Icon size={18} className="text-gray-500 mt-1" />

                  {textarea ? (
                    <textarea
                      rows={3}
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      className="w-full resize-none outline-none bg-transparent"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[key]}
                      disabled={disabled}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      className="w-full outline-none bg-transparent"
                    />
                  )}
                </div>

                {errors[key] && (
                  <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                )}
              </div>
            ))}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={saveAddress}
                onChange={(e) => setSaveAddress(e.target.checked)}
              />
              <span className="text-sm">Save address to profile</span>
            </label>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-semibold"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 h-fit">
          <h3 className="text-xl font-bold mb-6">🧾 Order Summary</h3>

          {orderProducts.map((item) => (
            <div key={item._id} className="flex justify-between mb-3">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{item.total}</p>
            </div>
          ))}

          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span>Saved Amount</span>
              <span>₹{savedAmount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
