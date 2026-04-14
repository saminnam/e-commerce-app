import { useEffect, useState, useContext } from "react";
import { useProfile } from "../../context/ProfileContext";
import { StoreContext } from "../../context/StoreContext";
import { createOrder } from "../../services/orderService";
import axios from "axios"; // 1. Added Axios for fetching
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Hash,
  CreditCard,
  Loader2, // Optional: for a better loading state
} from "lucide-react";

const CheckoutPage = () => {
  /* ---------------- CONTEXT ---------------- */
  const { profile, updateProfile } = useProfile();
  const { cartItems, getTotalCartAmount, clearCart } = useContext(StoreContext);

  /* ---------------- STATE ---------------- */
  const [products, setProducts] = useState([]); // 2. State for API products
  const [dataLoading, setDataLoading] = useState(true); // 3. State for fetching data
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

  /* ---------------- FETCH PRODUCTS FROM API ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        // Adjust response.data based on your API structure (e.g., response.data.products)
        setProducts(response.data); 
      } catch (err) {
        toast.error("Failed to load products from server");
      } finally {
        setDataLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        case "name": if (!regex.name.test(value)) message = "Enter valid full name"; break;
        case "email": if (!regex.email.test(value)) message = "Enter valid email"; break;
        case "phone": if (!regex.phone.test(value)) message = "Enter valid 10-digit mobile"; break;
        case "address": if (value.trim().length < 5) message = "Address too short"; break;
        case "city": if (value.trim().length < 2) message = "Enter valid city"; break;
        case "postalCode": if (!regex.postalCode.test(value)) message = "Enter valid 6-digit pincode"; break;
        default: break;
      }
      if (message) newErrors[key] = message;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- CART → ORDER SUMMARY (Using fetched 'products') ---------------- */
  const orderProducts = Object.keys(cartItems || {})
    .map((id) => {
      // 4. Now finding product from the 'products' state fetched via API
      const product = products.find((item) => String(item._id) === String(id));

      if (!product || cartItems[id] === 0) return null;

      return {
        ...product,
        quantity: cartItems[id],
        total: product.price * cartItems[id],
      };
    })
    .filter(Boolean);

  const totalItems = orderProducts.reduce((sum, item) => sum + item.quantity, 0);
  const totalMRP = orderProducts.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalPrice = orderProducts.reduce((sum, item) => sum + item.total, 0);
  const savedAmount = totalMRP - totalPrice;
  const totalAmount = getTotalCartAmount();

  const placeOrder = async () => {
    if (!orderProducts.length) {
      toast.warning("Cart is empty");
      return;
    }
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (saveAddress) {
        await updateProfile(form);
      }

      await createOrder({
        customer: { name: form.name, email: form.email, phone: form.phone },
        shippingAddress: { street: form.address, city: form.city, postalCode: form.postalCode },
        products: orderProducts.map((p) => ({
          productId: p._id,
          productName: p.name,
          quantity: p.quantity,
          price: p.price,
        })),
        totalAmount,
      });

      setForm({ name: "", email: "", phone: "", address: "", city: "", postalCode: "" });
      setSaveAddress(false);
      
      // 5. Clear the cart via context after successful order
      if (clearCart) clearCart();

      toast.success("🎉 Order placed successfully!");
    } catch (error) {
      toast.error("❌ Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", icon: User, label: "Full Name" },
    { key: "email", icon: Mail, label: "Email Address" },
    { key: "phone", icon: Phone, label: "Mobile Number" },
    { key: "address", icon: MapPin, label: "Address", textarea: true },
    { key: "city", icon: Building, label: "City" },
    { key: "postalCode", icon: Hash, label: "Postal Code" },
  ];

  // 6. Handle initial data loading state
  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-yellow-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT: FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-yellow-500" />
            <h2 className="text-2xl font-semibold content-font">Shipping Details</h2>
          </div>

          <div className="space-y-5">
            {fields.map(({ key, icon: Icon, label, textarea }) => (
              <div key={key}>
                <label className="text-sm font-medium text-gray-600">{label}</label>
                <div className={`mt-1 flex gap-3 border rounded-lg px-4 py-3 ${errors[key] ? "border-red-500" : "border-gray-300"}`}>
                  <Icon size={18} className="text-gray-500 mt-1" />
                  {textarea ? (
                    <textarea rows={3} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full resize-none outline-none bg-transparent" />
                  ) : (
                    <input type="text" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full outline-none bg-transparent" />
                  )}
                </div>
                {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} />
              <span className="text-sm">Save address to profile</span>
            </label>

            <button onClick={placeOrder} disabled={loading} className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-semibold transition-colors">
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 h-fit">
          <h3 className="text-xl font-semibold mb-6 border-b border-gray-300 pb-6 content-font">🧾 Order Summary</h3>

          {orderProducts.length === 0 ? (
             <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            orderProducts.map((item) => (
              <div key={item._id} className="flex justify-between mb-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-[#E5B236]">₹{item.total}</p>
              </div>
            ))
          )}

          <div className="pt-4 mt-4 border-t border-gray-300">
            <div className="space-y-2 font-medium">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Saved Amount:</span>
                <span>₹{savedAmount}</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-300 mt-4 pt-4 font-bold text-lg">
              <span>Total Payable</span>
              <span className="text-[#E5B236]">₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;