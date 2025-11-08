import React, { useEffect, useRef, useContext, useState } from "react";
import { Filter } from "lucide-react";
import { category_list, product_list } from "../data/productData";
import { StoreContext } from "../context/StoreContext";
import { X } from 'lucide-react';

const ProductFilter = ({
  categories,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
}) => {
  // const [showFilter, setShowFilter] = useState(false);
  const { showFilter, setShowFilter } = useContext(StoreContext);
  const drawerRef = useRef(null);
  const [maxPrice, setMaxPrice] = useState(0); 

  useEffect(() => {
    // ✅ Get the maximum price from product list
    if (product_list.length > 0) {
      const maxVal = Math.max(...product_list.map((p) => p.price));
      setMaxPrice(maxVal);
      setPriceRange([0, maxVal]);
    }
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden md:block md:sticky top-32 bg-white px-5 py-5 border border-gray-200 rounded-lg">
        <h4 className="text-lg font-semibold md:text-xl">Filter</h4>
        <div className="flex flex-col gap-5 mt-5">
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          {/* Category */}
          <div className="border border-gray-300 p-2 rounded">
            <h4 className="font-semibold text-gray-800 border-gray-300 border-b pb-1 mb-2">
              Categories
            </h4>
            <ul className="p-2 max-h-60 scrollbar overflow-y-auto w-full">
              {[{ cat_name: "All" }, ...category_list].map((cat, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedCategory(cat.cat_name)}
                  className={`px-3 py-2 cursor-pointer rounded transition ${
                    selectedCategory === cat.cat_name
                      ? "bg-[#e5b236] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat.cat_name}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            {/* Min Price Input */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-nowrap">Min ₹</span>
              <input
                type="number"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value) || 0, priceRange[1]])
                }
                className="md:w-16 border w-full border-gray-300 rounded p-1 text-sm"
              />
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-28 accent-[#e5b236]"
            />

            {/* Max Price Input */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-nowrap">Max ₹</span>
              <input
                type="number"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value) || 0])
                }
                className="md:w-16 border w-full border-gray-300 rounded p-1 text-sm"
              />
            </div>
          </div>

          {/* Sort */}
          <ul className="border border-gray-300 rounded p-2 max-h-48 overflow-y-auto space-y-2">
            <li className="font-semibold text-gray-800 border-gray-300 border-b pb-1">
              Sort By
            </li>

            {[
              { label: "Price: Low to High", value: "low-to-high" },
              { label: "Price: High to Low", value: "high-to-low" },
            ].map((option) => {
              const isActive = sortOrder === option.value;
              return (
                <li
                  key={option.value}
                  onClick={() => setSortOrder(isActive ? "" : option.value)}
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded transition ${
                    isActive
                      ? "bg-[#e5b236] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    readOnly
                    className={`cursor-pointer w-4 h-4 rounded ${
                      isActive
                        ? "accent-white bg-[#e5b236] border-white"
                        : "accent-[#e5b236]"
                    }`}
                  />
                  <label className="text-sm select-none">{option.label}</label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile Off-Canvas Filter */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
          showFilter
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            showFilter ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Drawer */}
        <div
          ref={drawerRef}
          className={`bg-white h-full w-3/4 sm:w-1/2 p-5 overflow-y-auto transform transition-transform duration-300 ${
            showFilter ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-lg font-semibold">Filter</h4>
            <button
              onClick={() => setShowFilter(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={22}/>
            </button>
          </div>

          {/* Same Filter Content */}
          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value) || 0, priceRange[1]])
                  }
                  className="border w-full border-gray-300 rounded p-1 text-sm"
                />
              </div>

              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full accent-[#e5b236]"
              />

              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  min={priceRange[0]}
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value) || 0])
                  }
                  className="border w-full border-gray-300 rounded p-1 text-sm"
                />
              </div>
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">Sort By</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
