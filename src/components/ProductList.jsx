import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { Plus, Star } from "lucide-react";
import ProductFilter from "./ProductFilter";

const ProductListPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const {
    filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,
    addToCart,
  } = useContext(StoreContext);

  return (
    <div className="container mx-auto p-2 md:p-6 content-font">
      {/* 🔹 Filter Section */}
      <div className="flex lg:flex-row gap-10 flex-col">
        <div className="">
          <ProductFilter
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            categories={categories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        {/* 🔹 Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border content-font h-max hover:border-[#e5b236] group overflow-hidden bg-white border-gray-200 pb-5 md:pb-10 relative rounded-lg p-4"
              >
                <div>
                  <div className="overflow-hidden h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full transition-animation group-hover:scale-110 object-cover rounded"
                    />
                  </div>
                  <div className="md:space-y-1 my-8">
                    <h3 className="text-[12px] md:text-[14px] truncate w-[120px] md:w-[200px]">
                      {product.name}
                    </h3>
                    {/* {product.author && (
                      <h5 className="text-[10px] md:text-[12px] truncate w-[120px] md:w-[200px] text-gray-700">
                        {product.author}
                      </h5>
                    )} */}
                    <div className="flex md:mt-0 mt-1 md:flex-row flex-col md:items-center gap-1 md:gap-4">
                      <div className="flex gap-2">
                        <p className="text-gray-800 text-[12px] md:text-[15px] font-semibold">
                          ₹{product.price}
                        </p>
                        <p className="text-red-500 text-[12px] md:text-[15px] line-through">
                          ₹{product.mrp}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < product.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 md:bottom-5 w-full left-1/2 px-4 transform -translate-x-1/2">
                  <div className="flex items-center w-full justify-between">
                    <Link
                      to={`/product/${product.slug}`}
                      className="bg-[#111825] md:text-[15px] text-[12px] text-white px-2 py-1 md:py-2 md:px-5 rounded hover:bg-yellow-600 transition"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => addToCart(product._id)}
                      className="flex cursor-pointer items-center border border-slate-100 justify-center text-[#111825] p-2 shadow-lg bg-white rounded-full transition"
                    >
                      <Plus className="w-4 transition-animation hover:rotate-180 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
                <div
                  className="absolute top-3 rounded-s right-0 w-[50px] text-center py-1 text-[12px] md:text-sm text-white bg-[#e5b336] 
     hover:scale-110 transition-transform duration-300 overflow-hidden"
                >
                  {product.discount}%
                  <span
                    className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-20 rotate-12 
        animate-[shine_2s_infinite]"
                  ></span>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
