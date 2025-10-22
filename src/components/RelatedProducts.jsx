import { Link } from "react-router-dom";
import { Plus, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import ProductCardSkeleton from "../skeletonLoader/ProductCardSkeleton"


const RelatedProducts = ({ category, currentProductId }) => {
  const { product_list, addToCart,loading } = useContext(StoreContext);

  // Filter related products by category (excluding current one)
  const relatedProducts = product_list.filter(
    (p) => p.category === category && p._id !== currentProductId
  );

  if (relatedProducts.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="">
        <h3 className="text-xl md:text-2xl font-semibold mb-6">
          Related Products
        </h3>

        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
          className="mySwiper"
        >
          {loading
            ? // ✅ Show skeletons when loading
              Array.from({ length: relatedProducts.length }).map((_, i) => (
                <SwiperSlide key={i}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))
            : // ✅ Show actual products when loaded
              relatedProducts.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="border content-font hover:border-[#e5b236] group overflow-hidden bg-white border-gray-200 pb-5 md:pb-10 relative rounded-lg p-4">
                    <div>
                      <div className="overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full transition-transform duration-300 group-hover:scale-110 object-cover rounded"
                        />
                      </div>
                      <div className="md:space-y-1 mt-4 mb-8">
                        <h3 className="text-[12px] md:text-[16px] truncate w-[120px] md:w-[200px]">
                          {item.name}
                        </h3>
                        <div className="flex md:mt-0 mt-1 md:flex-row flex-col md:items-center gap-1 md:gap-4">
                          <div className="flex gap-2">
                            <p className="text-gray-800 text-[12px] md:text-[15px] font-semibold">
                              ₹{item.price}
                            </p>
                            <p className="text-red-500 text-[12px] md:text-[15px] line-through">
                              ₹{item.mrp}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < item.rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="absolute bottom-3 md:bottom-5 w-full left-1/2 px-4 transform -translate-x-1/2">
                      <div className="flex items-center w-full justify-between">
                        <Link
                          to={`/product/${item.slug}`}
                          className="bg-[#111825] md:text-[15px] text-[12px] text-white px-2 py-1 md:py-2 md:px-5 rounded hover:bg-yellow-600 transition"
                        >
                          View Details
                        </Link>

                        <button
                          onClick={() => addToCart(item._id)}
                          className="flex cursor-pointer items-center border border-slate-100 justify-center text-[#111825] p-2 shadow-lg bg-white rounded-full transition"
                        >
                          <Plus className="w-4 transition-transform duration-300 hover:rotate-180 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Discount tag */}
                    <div
                      className="absolute top-3 rounded-s right-0 w-[50px] text-center py-1 text-[12px] md:text-sm text-white bg-[#e5b336]
                hover:scale-110 transition-transform duration-300 overflow-hidden"
                    >
                      {item.discount}%
                      <span
                        className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-20 rotate-12 
                  animate-[shine_2s_infinite]"
                      ></span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
