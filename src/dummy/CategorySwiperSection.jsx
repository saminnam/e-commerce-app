import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { product_list } from "../../data/productData";
import { MoveLeft, MoveRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
// adjust path if needed

const CategorySwiperSection = () => {
  // ✅ Get unique categories
  const { addToCart } = useContext(StoreContext);
  const categories = [...new Set(product_list.map((p) => p.category))];

  return (
    <section className="px-5 md:px-8 space-y-12">
      {categories.map((category, index) => {
        const categoryProducts = product_list.filter(
          (p) => p.category === category
        );

        const navPrev = `prev-${index}`;
        const navNext = `next-${index}`;

        return (
          <div key={category} className="space-y-6 container mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                {category}
              </h2>
              <div className="flex gap-3">
                <button className={`swiper-button ${navPrev} text-[#e5b236]`}>
                  <MoveLeft size={18} />
                </button>
                <button className={`swiper-button ${navNext} text-[#e5b236]`}>
                  <MoveRight size={18} />
                </button>
              </div>
            </div>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: `.${navNext}`,
                prevEl: `.${navPrev}`,
              }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
              }}
              loop={true}
              className="category-swiper"
            >
              {categoryProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className=" content-font h-max hover:border-[#e5b236] group overflow-hidden bg-white pb-5 md:pb-10 relative rounded-lg p-">
                    <div>
                      <Link to={`/product/${product.slug}`}>
                        <div className="overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full transition-transform duration-300 group-hover:scale-110 object-cover rounded"
                          />
                        </div>
                      </Link>
                      <div className="md:space-y-1 mt-4 mb-8">
                        <h3 className="text-[12px] md:text-[16px] truncate w-[120px] md:w-[160px] 2xl:w-[200px]">
                          {product.name}
                        </h3>
                        <div className="flex md:mt-0 mt-1 md:flex-row flex-col md:items-center gap-1 2xl:gap-4">
                          <div className="flex gap-2">
                            <p className="text-gray-800 text-[12px] md:text-[15px] font-semibold">
                              ₹{product.price}
                            </p>
                            <p className="text-red-500 text-[12px] md:text-[15px] line-through">
                              ₹{product.mrp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 md:bottom-5 w-full transform right-0">
                      <div className="flex items-center justify-between w-full">
                        <Link
                          to={`/product/${product.slug}`}
                          className="bg-[#111825] md:text-[15px] text-[12px] text-white px-2 py-1 md:py-2 md:px-5 rounded hover:bg-yellow-600 transition"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => addToCart(product._id)}
                          className="flex cursor-pointer items-center border border-slate-[#111825] justify-center text-[#111825] p-2 shadow-md bg-white rounded-full transition"
                        >
                          <Plus className="w-4 transition-transform duration-300 hover:rotate-180 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                    {product.discount > 0 && (
                      <div className="absolute top-3 rounded-s right-0 w-[50px] text-center py-1 text-[12px] md:text-sm text-white bg-[#e5b336] hover:scale-110 transition-transform duration-300 overflow-hidden">
                        {product.discount}%
                        <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-20 rotate-12 animate-[shine_2s_infinite]" />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </section>
  );
};

export default CategorySwiperSection;







// this is old with the card border
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { product_list } from "../../data/productData";
import { MoveLeft, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
// adjust path if needed

const CategorySwiperSection = () => {
  // ✅ Get unique categories
  // const { addToCart } = useContext(StoreContext);
  const categories = [...new Set(product_list.map((p) => p.category))];

  return (
    <section className="px-5 md:px-8 space-y-12">
      {categories.map((category, index) => {
        const categoryProducts = product_list.filter(
          (p) => p.category === category
        );

        const navPrev = `prev-${index}`;
        const navNext = `next-${index}`;

        return (
          <div key={category} className="space-y-6 container mx-auto">
            {/* 🔹 Section Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                {category}
              </h2>
              <div className="flex gap-3">
                <button className={`swiper-button ${navPrev} text-[#e5b236]`}>
                  <MoveLeft size={18} />
                </button>
                <button className={`swiper-button ${navNext} text-[#e5b236]`}>
                  <MoveRight size={18} />
                </button>
              </div>
            </div>

            {/* 🔹 Swiper Section */}
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: `.${navNext}`,
                prevEl: `.${navPrev}`,
              }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
              }}
              loop={true}
              className="category-swiper"
            >
              {categoryProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="border content-font h-max hover:border-[#e5b236] group overflow-hidden bg-white border-gray-200 pb-5 md:pb-10 relative rounded-lg p-4">
                    <div>
                      <Link to={`/product/${product.slug}`}>
                        <div className="overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full transition-transform duration-300 group-hover:scale-110 object-cover rounded"
                          />
                        </div>
                      </Link>
                      <div className="md:space-y-1 mt-4 mb-8">
                        <h3 className="text-[12px] md:text-[16px] truncate w-[120px] md:w-[160px] 2xl:w-[200px]">
                          {product.name}
                        </h3>
                        <div className="flex md:mt-0 mt-1 md:flex-row flex-col md:items-center gap-1 2xl:gap-4">
                          <div className="flex gap-2">
                            <p className="text-gray-800 text-[12px] md:text-[15px] font-semibold">
                              ₹{product.price}
                            </p>
                            <p className="text-red-500 text-[12px] md:text-[15px] line-through">
                              ₹{product.mrp}
                            </p>
                          </div>
                          {/* <div className="flex items-center gap-[1.3px] 2xl:gap-1">
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
                          </div> */}
                        </div>
                      </div>
                    </div>
                    {/* Buttons */}
                    <div className="absolute bottom-3 md:bottom-5 w-full left-1/2 px-4 transform -translate-x-1/2">
                      <div className="flex items-center w-full justify-between">
                        <Link
                          to={`/product/${product.slug}`}
                          className="bg-[#111825] md:text-[15px] text-[12px] text-white px-2 py-1 md:py-2 md:px-5 rounded hover:bg-yellow-600 transition"
                        >
                          View Details
                        </Link>
                        {/* <button
                          onClick={() => addToCart(product._id)}
                          className="flex cursor-pointer items-center border border-slate-[#111825] justify-center text-[#111825] p-2 shadow-md bg-white rounded-full transition"
                        >
                          <Plus className="w-4 transition-transform duration-300 hover:rotate-180 h-4 md:w-5 md:h-5" />
                        </button> */}
                      </div>
                    </div>
                    {/* Discount Tag */}
                    {product.discount > 0 && (
                      <div className="absolute top-3 rounded-s right-0 w-[50px] text-center py-1 text-[12px] md:text-sm text-white bg-[#e5b336] hover:scale-110 transition-transform duration-300 overflow-hidden">
                        {product.discount}%
                        <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-20 rotate-12 animate-[shine_2s_infinite]" />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </section>
  );
};

export default CategorySwiperSection;

