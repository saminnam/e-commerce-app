import { createContext, useState, useEffect, useMemo } from "react";
import { showToast } from "../modals/ToastNotification";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // 🔐 Fetch products with JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch("http://localhost:5000/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const updated = {
        ...prev,
        [product._id]: (prev[product._id] || 0) + 1,
      };
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });

    showToast(`${product.name} added to cart!`, "success");
  };

  const clearCart = () => {
    if (!window.confirm("Clear cart?")) return;
    setCartItems({});
    localStorage.removeItem("cartItems");
    toast.error("Cart cleared!");
  };

  const removeFromCart = (product, removeAll = false) => {
    const id = product._id;

    setCartItems((prev) => {
      let updated = { ...prev };

      if (removeAll) delete updated[id];
      else {
        updated[id]--;
        if (updated[id] <= 0) delete updated[id];
      }

      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });

    showToast(`${product.name} removed from cart!`, "error");
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) total += product.finalPrice * cartItems[id];
    }
    return total;
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered = filtered.filter(
      (p) => p.finalPrice >= priceRange[0] && p.finalPrice <= priceRange[1]
    );

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.finalPrice - a.finalPrice);
    }

    return filtered;
  }, [products, selectedCategory, priceRange, sortOrder, searchTerm]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <StoreContext.Provider
      value={{
        user,
        login,
        logout,
        menuOpen,
        setMenuOpen,
        showFilter,
        setShowFilter,
        filteredProducts,
        categories,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        selectedCategory,
        setSelectedCategory,
        sortOrder,
        setSortOrder,
        priceRange,
        setPriceRange,
        searchTerm,
        setSearchTerm,
        loading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
