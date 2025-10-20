import React, { useState } from "react";
import "./assets/styles/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
// import Cart from "./pages/Cart";

const App = () => {
  // const [showMenuList, setShowMenuList] = useState(false);
  // const [category, setCategory] = useState("All");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
};

export default App;
