import React from "react";
import { category_list } from "../data/productData";

const ExploreCategory = () => {
  return (
    <section className="px-5 md:px-8 pb-16">
      <div className="container mx-auto">
        <div className="mt-8 md:mt-16 scrollbar flex gap-3 pb-2 md:pb-3 lg:gap-6 overflow-x-auto scrollbar-hide">
          {category_list.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer group w-[80px] md:w-[100px] text-center"
            >
              <div className="bg-slate-200 p-2 rounded-lg overflow-hidden">
                <img
                  className="w-full h-[60px] md:h-[80px] transition-animation group-hover:scale-110 object-cover"
                  src={item.cat_img}
                  alt={item.cat_name}
                />
              </div>
              <p className="text-[12px] content-font md:text-[14px] mt-2 font-medium text-gray-800">
                {item.cat_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategory;

