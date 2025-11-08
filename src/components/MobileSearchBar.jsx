import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileSearchBar = ({
  category_list,
  searchValue,
  setSearchValue,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    navigate(`/products?category=${encodeURIComponent(category)}`);
    setShowDropdown(false); // close after selecting
  };

  return (
    <div className="flex md:hidden justify-center px-2 py-2">
      <div className="flex">
        {/* Menu Icon */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-l-full flex items-center justify-center"
          >
            {showDropdown ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Dropdown List */}
          {showDropdown && (
            <div
              className={`absolute top-full left-0 bg-white mt-1 rounded shadow-lg w-max py-2 z-50 overflow-y-auto max-h-[150px] md:max-h-[300px]
  transition-all duration-200 ease-in-out transform origin-top
  opacity-100 scale-y-100`}
            >
              <ul className="text-sm">
                {/* All Category */}
                <li
                  onClick={() => handleCategorySelect("All")}
                  className="px-3 font-semibold py-2 hover:bg-[#E5B236] hover:text-white cursor-pointer"
                >
                  All
                </li>

                {/* Dynamic Categories */}
                {category_list.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategorySelect(item.cat_name)}
                    className="px-3 font-semibold py-2 hover:bg-[#E5B236] hover:text-white cursor-pointer"
                  >
                    {item.cat_name}
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
    </div>
  );
};

export default MobileSearchBar;
