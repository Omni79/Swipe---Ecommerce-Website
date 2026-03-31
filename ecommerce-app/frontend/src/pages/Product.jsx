import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");

  // ✅ FIXED: use .find instead of .map
  const fetchProductData = () => {
    const foundProduct = products.find(
      (item) => item._id === productId
    );

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image?.[0] || null);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchProductData();
    }
  }, [productId, products]);

  // ✅ Loading fallback
  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ---------- Product Data ------------ */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        
        {/* ---------- Image Section ---------- */}
        <div className="flex flex-col gap-6 md:w-1/2">
          
          {/* Main Image */}
          <figure className="w-full bg-gray-100 rounded-lg overflow-hidden">
            {image && (
              <img
                src={image}
                alt={`${productData.name} screenshot`}
                className="w-full h-[400px] md:h-[550px] object-cover"
              />
            )}
          </figure>

          {/* Thumbnails */}
          {productData?.image?.length > 1 && (
            <nav
              className="flex gap-3 overflow-x-auto p-2"
              aria-label="Project image thumbnails"
            >
              {productData.image.map((imageUrl, index) => (
                <button
                  key={imageUrl}
                  onClick={() => setImage(imageUrl)}
                  className={`
                    flex-shrink-0 w-24 h-16 sm:w-20 sm:h-16 rounded-lg overflow-hidden 
                    border-2 transition-all
                    ${
                      image === imageUrl
                        ? "border-black ring-2 ring-black ring-offset-2"
                        : "border-gray-200 hover:border-gray-400"
                    }
                  `}
                  aria-label={`View image ${index + 1} of ${productData.image.length}`}
                  aria-pressed={image === imageUrl}
                >
                  <img
                    src={imageUrl}
                    alt={`${productData.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* ---------- Product Info ---------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* Info */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description Section ---------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet.
          </p>
          <p>
            Products are displayed with descriptions, images, pricing, and
            variations such as size or color.
          </p>
        </div>
      </div>

      {/* ---------- Related Products ---------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;