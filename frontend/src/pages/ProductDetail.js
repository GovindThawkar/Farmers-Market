import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const productData = await productService.getProductById(id);
      setProduct(productData);
    } catch (error) {
      console.error("Error loading product:", error);
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      await addToCart(product.id, quantity);
      alert("Product added to cart!");
    } catch (error) {
      alert("Error adding product to cart");
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= product.quantity) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <div>
                  <div className="aspect-w-1 aspect-h-1 mb-4">
                    <img
                      src={product.imageUrls[selectedImage]}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                  {product.imageUrls.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.imageUrls.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                            selectedImage === index
                              ? "ring-2 ring-primary-500"
                              : ""
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-lg">
                    No Image Available
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    ${product.price}
                  </span>
                  {product.organic && (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      Organic
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-600 capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Unit:</span>
                    <span className="ml-2 text-gray-600">
                      {product.unit || "piece"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Available:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {product.quantity} units
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Farmer ID:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {product.farmerId}
                    </span>
                  </div>
                </div>
              </div>

              {product.available && product.quantity > 0 ? (
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium text-gray-700">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={product.quantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-500">
                      Max: {product.quantity} {product.unit || "units"}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    This product is currently out of stock
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Product Information
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Fresh from local farms</li>
                  <li>• Sustainably grown</li>
                  <li>• No harmful pesticides</li>
                  <li>• Direct from farmer to you</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
