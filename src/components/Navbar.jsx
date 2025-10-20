import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  User,
  Search,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import { category_list } from "../data/productData";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full border-b border-gray-200 content-font">
      {/* 🔹 Top Bar */}
      <div className="hidden md:flex justify-between items-center bg-[#E5B236] text-sm px-6 py-2">
        <div className="flex gap-3 text-white">
          <Link to="/" className="hover:text-[#111825] transition-animation">
            Become a Seller
          </Link>
          <span>|</span>
          <Link
            to="/about_us"
            className="hover:text-[#111825] transition-animation"
          >
            About Us
          </Link>
          <span>|</span>
          <Link
            to="/return_policy"
            className="hover:text-[#111825] transition-animation"
          >
            Returns Policy
          </Link>
        </div>
        <div className="flex gap-3 text-white">
          <Link
            to="/singup"
            className="hover:text-[#111825] transition-animation"
          >
            Create Account
          </Link>
          <span>|</span>
          <Link
            to="/login"
            className="hover:text-[#111825] transition-animation"
          >
            Login
          </Link>
        </div>
      </div>

      {/* 🔹 Middle Section */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3 bg-[#111825]">
        {/* Logo */}
        <div>
          <img
            src="./src/assets/images/logo-bg.png"
            alt=""
            className="w-[80px] md:w-[105px]"
          />
        </div>
        <nav className="hidden uppercase lg:flex justify-center gap-10 text-white text-sm font-medium">
          <Link to="/" className="hover:text-[#E5B236] transition-animation">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-[#E5B236] transition-animation"
          >
            Shop
          </Link>
          <Link to="/" className="hover:text-[#E5B236] transition-animation">
            Re-seller
          </Link>
          <Link
            to="/blog"
            className="hover:text-[#E5B236] transition-animation"
          >
            Blog
          </Link>
          <Link
            to="/contact_us"
            className="hover:text-[#E5B236] transition-animation"
          >
            Contact Us
          </Link>
        </nav>
        {/* Search & Categories (Desktop) */}
        <div className="hidden md:flex items-center mx-10">
          <div ref={dropdownRef} className="relative text-gray-600">
            <button
              className="bg-white px-3 py-2 cursor-pointer rounded-l-full hidden lg:flex items-center gap-1"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <span>Categories</span> <ChevronDown size={20} />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute top-full left-0 bg-white mt-1 scrollbar rounded shadow-lg w-max py-2 z-50 overflow-y-auto max-h-[150px] md:max-h-[300px]
          transition-all duration-300 ease-in-out transform origin-top
          ${
            categoryOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 pointer-events-none"
          }`}
            >
              {category_list.map((item, index) => (
                <ul className="text-sm" key={index}>
                  <li className="px-3 py-2 hover:bg-[#E5B236] hover:text-white cursor-pointer">
                    {item.cat_name}
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className="flex border bg-white lg:rounded-l-none rounded-l-full rounded-r-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 outline-none"
            />
            <button className="bg-[#E5B236] text-white px-4 rounded-r-full">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Wishlist & Cart */}
        <div className="flex items-center gap-4 text-white">
          <button className="relative">
            <Heart size={22} />
          </button>
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
          </Link>
          <button className="hidden md:block">
            <User size={22} />
          </button>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden cursor-pointer text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      {/* 🔹 Mobile Canvas Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <div className="p-4">
          {/* Links */}
          <ul className="space-y-3 text-gray-700">
            <li className="border-b border-gray-300 pb-2">
              <Link to="/">Home</Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link to="/products">Shop</Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link to="/">Re-Seller</Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link to="/contact_us">Contact Us</Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link to="/">Become a Seller</Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link to="/about_us">About Us</Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link to="/return_policy">Returns Policy</Link>
            </li>
          </ul>
          <ul className="mt-5 flex gap-2 justify-center text-center">
            <li className="bg-[#111825] w-full text-white py-2 px-4">
              <Link to="/login" className="flex  items-center justify-between">
                <span>Login</span> <LogIn size={18} />
              </Link>
            </li>
            <li className="bg-[#E5B236] text-white w-full py-2 px-4">
              <Link to="/signup" className="flex  items-center justify-between">
                <span>Signup</span> <LogIn size={18} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-[#111825] md:hidden block px-3 py-4 sticky top-0">
        <div className="flex bg-white lg:rounded-l-none rounded-l-full rounded-r-full">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 outline-none"
          />
          <button className="bg-[#E5B236] cursor-pointer text-white px-4 rounded-r-full">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
