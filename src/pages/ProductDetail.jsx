import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { product_list, addToCart } = useContext(StoreContext);
  const product = product_list.find((p) => p._id === id);
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(product?.images?.[0]);

  if (!product)
    return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 mx-auto max-w-6xl">
        {/* Left Section - Image Gallery */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Thumbnail List */}
          <div className="flex md:flex-col gap-3 md:w-24">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                onClick={() => setSelectedImg(img)}
                className={`w-20 h-20 object-cover rounded-md border cursor-pointer ${
                  selectedImg === img
                    ? "border-[#E5B236] shadow-md"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={selectedImg}
              alt={product.name}
              className="w-full rounded-lg border object-contain"
            />
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="w-full space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.desc}</p>

          {/* Price Section */}
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-[#111825]">
              ₹{product.price}
            </p>
            {product.mrp && (
              <>
                <p className="text-gray-400 line-through">₹{product.mrp}</p>
                <p className="text-green-600 font-semibold">
                  {Math.round(
                    ((product.mrp - product.price) / product.mrp) * 100
                  )}
                  % off
                </p>
              </>
            )}
          </div>

          {/* Offers Section */}
          <div className="bg-white shadow border border-gray-200 p-4 rounded-md">
            <h4 className="font-semibold text-[#111825] mb-2">More Details</h4>
            <ul className="space-y-1 text-sm text-gray-700 content-font">
              <li>{product.author}</li>
              <li>{product.publisher}</li>
              <li>{product.releasedDate}</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 content-font">
            <button
              onClick={() => addToCart(product._id)}
              className="bg-[#111825] cursor-pointer md:text-[15px] text-[12px] text-white px-2 py-1 md:py-2 md:px-5 rounded hover:bg-[#E5B236] transition"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-[#E5B236] hover:bg-[#111825] cursor-pointer text-white px-6 py-2 rounded-md font-medium"
            >
              Buy Now
            </button>
          </div>

          {/* Highlights */}
          {/* <div className="pt-4">
            <h4 className="font-semibold text-[#111825] mb-2">Highlights</h4>
            <ul className="list-disc list-inside content-font text-sm text-gray-600 space-y-1">
              <li>Size: {product.size || "Standard"}</li>
              <li>Material: {product.material || "Plastic"}</li>
              <li>Warranty: {product.warranty || "No warranty"}</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
