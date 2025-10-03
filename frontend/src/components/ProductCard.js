import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      await addToCart(product.id, 1);
      alert("Product added to cart!");
    } catch (error) {
      alert("Error adding product to cart");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {product.imageUrls && product.imageUrls.length > 0 ? (
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price}
          </span>
          {product.organic && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Organic
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {product.quantity} {product.unit || "units"} available
          </span>
          <span className="text-sm text-gray-500 capitalize">
            {product.category}
          </span>
        </div>

        <div className="mt-4 flex space-x-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded text-center text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            View Details
          </Link>
          {product.available && product.quantity > 0 && (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
