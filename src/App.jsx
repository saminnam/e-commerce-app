import React, { useEffect } from "react";
import "./assets/styles/global.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/product-detail/ProductDetail";
import ProductPage from "./pages/products/ProductPage";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import FloatingMenu from "./components/FloatingMenu";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import ToastNotification from "./modals/ToastNotification";
import AboutPage from "./pages/about-us/AboutPage";
import BecomeaSeller from "./pages/become-a-seller/BecomeaSeller";
import BlogPage from "./pages/blog/BlogPage";
import ContactPage from "./pages/contact/ContactPage";
import BlogDetail from "./pages/blog-details/BlogDetail";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

import AuthPage from "./pages/auth/AuthPage";

const App = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
  };
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="about-us" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/become-a-seller" element={<BecomeaSeller />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/contact-us" element={<ContactPage />} />
      </Routes>
      <Footer />
      <FloatingMenu />
      <ToastNotification />
    </>
  );
};

export default App;
