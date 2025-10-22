import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

const MobileSearchBar = ({ category_list, searchValue, setSearchValue, handleSearch, setSelectedCategory }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white shadow-lg rounded-full z-50">
      {/* Menu Icon */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-l-full flex items-center justify-center"
        >
          {showDropdown ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Dropdown List */}
        {showDropdown && (
          <div className="absolute bottom-12 left-0 w-40 bg-white border shadow-lg rounded-lg overflow-hidden">
            <ul>
              <li
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCategory("");
                  setShowDropdown(false);
                }}
              >
                All
              </li>
              {category_list.map((cat, i) => (
                <li
                  key={i}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(cat.cat_name);
                    setShowDropdown(false);
                  }}
                >
                  {cat.cat_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full px-4 py-2 outline-none"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-[#E5B236] text-white px-4 rounded-r-full flex items-center justify-center"
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default MobileSearchBar;
