import React from "react";
import { category_list } from "../../data/productData";
import { useNavigate } from "react-router-dom";
// ✅ Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const ExploreCategory = () => {
  const navigate = useNavigate();


  const handleCategorySelect = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="px-5 md:px-8 pb-16">
      <div className="container mx-auto">
        <div className="mt-8 md:mt-16">
          <Swiper
            modules={[Autoplay]}
            speed={4000}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            spaceBetween={4}
            slidesPerView={2}
            breakpoints={{
              320: { slidesPerView: 4, spaceBetween: 15 }, // small phones
              480: { slidesPerView: 4, spaceBetween: 17 },
              580: { slidesPerView: 5, spaceBetween: 18 }, // large phones
              640: { slidesPerView: 6, spaceBetween: 20 }, // tablets portrait
              768: { slidesPerView: 7, spaceBetween: 25 }, // tablets landscape
              1024: { slidesPerView: 8, spaceBetween: 30 }, // laptops
              1280: { slidesPerView: 10, spaceBetween: 35 }, // desktops
              1536: { slidesPerView: 11, spaceBetween: 40 }, // large screens
            }}
            loop={true}
            className="mySwiper"
            style={{
              transitionTimingFunction: "linear", // 👈 this makes it scroll with ease-linear
            }}
          >
            {category_list.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="text-center"
                  onClick={() => handleCategorySelect(item.cat_name)}
                >
                  <div className="flex-shrink-0 cursor-pointer group w-[80px] md:w-[100px] mx-auto">
                    <div className="bg-slate-200 p-2 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-[60px] md:h-[80px] rounded-lg transition-transform duration-300 group-hover:scale-105 object-cover"
                        src={item.cat_img}
                        alt={item.cat_name}
                      />
                    </div>
                    <p className="text-[12px] md:text-[14px] mt-2 font-medium text-gray-800">
                      {item.cat_name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategory;
