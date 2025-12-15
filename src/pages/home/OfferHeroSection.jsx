import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { heroOfferSlides } from "../../data/heroSlides"; // adjust path if needed
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const OfferHeroSection = () => {
  return (
    <section className="overflow-hidden m-1">
      <Swiper
        direction="vertical"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        slidesPerView={2}
        spaceBetween={5} // 👈 Adds gap between slides
        breakpoints={{
          0: { direction: "horizontal", spaceBetween: 10 }, // mobile
          768: { direction: "vertical", spaceBetween: 5 }, // tablet & desktop
        }}
        modules={[Autoplay]}
        className="h-auto md:h-[500px]"
        speed={600}
      >
        {heroOfferSlides.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative group bg-[url('./assets/images/bg-pattern/shopping-pattern.avif')] bg-cover bg-center overflow-hidden">
              {/* 🔹 Overlay background color */}
              <div
                className={`absolute inset-0 opacity-90 ${
                  item.id % 3 === 0
                    ? "bg-[#030050db]" // blue
                    : item.id % 3 === 1
                    ? "bg-[#e5b336e0]" // yellow
                    : "bg-[#000000d0]" // third color
                }`}
              ></div>

              {/* 🔹 Content */}
              <div className="relative z-10 flex justify-between items-center px-5 md:py-10 lg:py-12">
                <div className="space-y-3 w-[65%]">
                  <h2 className="text-white font-semibold lg:text-2xl text-xl">
                    {item.title}
                  </h2>
                  <h5 className="font-bold content-font text-white text-lg md:text-xl">
                    {item.subTitle}
                  </h5>
                  <Link
                    to="/products"
                    className="bg-white flex gap-1 items-center px-2 py-1 md:text-[16px] text-[12px] cursor-pointer mt-8 w-max md:px-5 md:py-2 font-semibold transition-all rounded hover:bg-[#111825] hover:text-white"
                  >
                    <span>Shop Now</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>

                <div className="w-[35%] overflow-hidden group-hover:scale-110 transition-animation">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover h-[145px]"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OfferHeroSection;
