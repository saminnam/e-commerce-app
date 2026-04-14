import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios"; // Ensure axios is installed
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // 🟢 Data States
  const [products, setProducts] = useState([]); // Replaces static product_list
  const [loading, setLoading] = useState(true);
  
  // UI & Cart States
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // Filters & Sorting States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]); // Set a high default
  const [navbarSearch, setNavbarSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  // 1️⃣ FETCH DATA FROM API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      
      // Auto-adjust price range based on actual data
      if (response.data.length > 0) {
        const maxPrice = Math.max(...response.data.map(p => p.price));
        setPriceRange([0, maxPrice]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Could not load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2️⃣ CART LOGIC (Remains similar, but uses 'products' state)
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const updated = { ...prev, [product._id]: (prev[product._id] || 0) + 1 };
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (product, removeAll = false) => {
    const id = product._id;
    setCartItems((prev) => {
      let updated = { ...prev };
      if (removeAll) { delete updated[id]; } 
      else {
        updated[id] = Math.max((updated[id] || 0) - 1, 0);
        if (updated[id] === 0) delete updated[id];
      }
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
    toast.error(`${product.name} removed!`);
  };

  const clearCart = () => {
    if (window.confirm("Clear entire cart?")) {
      setCartItems({});
      localStorage.removeItem("cartItems");
      toast.info("Cart cleared");
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) total += product.price * cartItems[id];
    }
    return total;
  };

  // 3️⃣ FILTERING & SEARCHING (Client-side)
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    const finalSearch = navbarSearch || filterSearch;
    if (finalSearch.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(finalSearch.toLowerCase())
      );
    }

    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCategory, priceRange, sortOrder, navbarSearch, filterSearch]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const contextValue = {
    menuOpen, setMenuOpen,
    showFilter, setShowFilter,
    product_list: products, // Kept key name 'product_list' so your components don't break
    filteredProducts,
    categories,
    clearCart,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    selectedCategory, setSelectedCategory,
    sortOrder, setSortOrder,
    priceRange, setPriceRange,
    filterSearch, setFilterSearch,
    navbarSearch, setNavbarSearch,
    loading, setLoading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;