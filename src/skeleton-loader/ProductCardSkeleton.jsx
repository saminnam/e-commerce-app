import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="md:border animate-pulse md:w-[240px] h-max overflow-hidden bg-white border-gray-200 pb-5 md:pb-10 relative rounded-lg md:p-4">
      {/* Image Placeholder */}
      <div className="overflow-hidden rounded object-cover bg-gray-200 h-[250px] w-full"></div>

      {/* Product Info Placeholder */}
      <div className="md:space-y-1 mt-4 mb-8">
        <div className="h-4 md:h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 md:h-4 bg-gray-200 rounded w-1/2"></div>

        {/* Price and Rating Placeholder */}
        <div>
          <div className="flex gap-2">
            <div className="h-3 md:h-4 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 md:h-3 md:w-3 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Placeholder */}
      <div className="absolute bottom-3 md:bottom-5 w-full left-1/2 md:px-4 transform -translate-x-1/2">
        <div className="flex items-center w-full justify-between">
          <div className="h-6 md:h-8 bg-gray-200 rounded w-20 md:w-28"></div>
          <div className="h-8 w-8 md:h-10 md:w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Discount Tag Placeholder */}
      <div className="absolute top-3 rounded-s right-0 w-[50px] text-center py-1 bg-gray-300 text-transparent text-[12px] md:text-sm">
        0%
        <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-20 rotate-12 animate-[shine_2s_infinite]"></span>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
