import { createContext, useState, useEffect, useMemo } from "react";
import { product_list } from "../data/productData";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // 🟢 Filters & Sorting States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate API delay
    return () => clearTimeout(timer);
  }, []);

  // 🟢 Load cart data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // ➕ Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };
  
  const clearCart = () => setCartItems({});

  const removeFromCart = (id, removeAll = false) => {
    setCartItems((prev) => {
      if (removeAll) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: Math.max(prev[id] - 1, 0) };
    });
  };

  // 💰 Calculate total cart value
  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = product_list.find((p) => p._id === id);
      if (product) total += product.price * cartItems[id];
    }
    return total;
  };

  // 🧠 Filtering, Sorting & Searching Logic (Memoized)
  const filteredProducts = useMemo(() => {
    let filtered = [...product_list];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, priceRange, sortOrder, searchTerm]);

  // 🔹 Get all unique categories (for dropdowns or filters)
  const categories = ["All", ...new Set(product_list.map((p) => p.category))];

  const contextValue = {
    // Products & Filters
    product_list,
    filteredProducts,
    categories,

    // Cart
    clearCart,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,

    // Filters
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,

    // loader
    loading,
    setLoading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
