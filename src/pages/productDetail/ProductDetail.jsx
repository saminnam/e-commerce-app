import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "swiper/css";
import "swiper/css/navigation";
import { ShoppingCart } from "lucide-react";
import RelatedProducts from "../../components/RelatedProducts";
import GlobalHero from "../../components/GlobalHero";

const ProductDetail = () => {
  const { slug } = useParams();
  const { product_list, addToCart } = useContext(StoreContext);
  const product = product_list.find((p) => p.slug === slug);

  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(product?.images?.[0]);
  // ✅ Set the product name in the browser tab
  useEffect(() => {
    if (product?.name) {
      document.title = `${product.name} | Baqavi Book Centre`;
    }
  }, [product]);

  if (!product)
    return <div className="text-center mt-10">Product not found</div>;

  return (
    <>
      {/* <GlobalHero /> */}
      <div className="container mx-auto px-4 py-10">
        {/* Product Detail Section */}
        <div className="flex flex-col md:flex-row gap-8 mx-auto max-w-7xl">
          {/* Left - Gallery */}
          <div className="flex md:flex-row flex-col-reverse gap-6 w-full">
            <div className="flex md:flex-col gap-3 md:w-24">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumbnail"
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer ${
                    selectedImg === img
                      ? "border-[#E5B236] shadow-md"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex-1">
              <img
                src={selectedImg}
                alt={product.name}
                className="w-full rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div className="w-full space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h2>
            <p className="text-gray-500">{product.desc}</p>

            {/* Price */}
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

            {/* Add to Cart */}
            <div className="flex gap-3 pt-4 content-font">
              <button
                onClick={() => addToCart(product._id)}
                className="bg-[#111825] cursor-pointer flex gap-2 items-center text-white px-5 py-2 rounded hover:bg-[#E5B236] transition"
              >
                <ShoppingCart size={20} /> <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Related Products Carousel */}
        <RelatedProducts
          category={product.category}
          currentProductId={product._id}
        />
      </div>
    </>
  );
};

export default ProductDetail;
