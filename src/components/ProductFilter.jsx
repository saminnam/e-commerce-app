import React, { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";

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
  const [showFilter, setShowFilter] = useState(false);
  const drawerRef = useRef(null);

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
      <div className="hidden md:block md:sticky top-0 h-max bg-white px-5 py-10 border border-gray-200 rounded-lg">
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
          {/* Price Range */}
          <div className="flex md:flex-row flex-col md:items-center gap-3">
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
                className="md:w-20 border w-full border-gray-300 rounded p-1 text-sm"
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
              className="w-40 accent-yellow-500"
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
                className="md:w-20 border w-full border-gray-300 rounded p-1 text-sm"
              />
            </div>
          </div>

          {/* Sort */}
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

      {/* Mobile Floating Filter Button */}
      <button
        onClick={() => setShowFilter(true)}
        className="md:hidden cursor-pointer z-20 fixed bottom-5 right-5 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition"
      >
        <Filter size={20} />
      </button>

      {/* Mobile Off-Canvas Filter */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
          showFilter ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
              ✕
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
                className="w-full accent-yellow-500"
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
