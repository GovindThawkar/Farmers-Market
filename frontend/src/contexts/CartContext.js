import React, { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [] });
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart({ cartItems: [] });
      setCartCount(0);
    }
  }, [user]);

  const loadCart = async () => {
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
      setCartCount(cartData.cartItems ? cartData.cartItems.length : 0);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const updatedCart = await cartService.addToCart(productId, quantity);
      setCart(updatedCart);
      setCartCount(updatedCart.cartItems ? updatedCart.cartItems.length : 0);
    } catch (error) {
      throw error;
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const updatedCart = await cartService.updateCartItem(productId, quantity);
      setCart(updatedCart);
      setCartCount(updatedCart.cartItems ? updatedCart.cartItems.length : 0);
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await cartService.removeFromCart(productId);
      setCart(updatedCart);
      setCartCount(updatedCart.cartItems ? updatedCart.cartItems.length : 0);
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ cartItems: [] });
      setCartCount(0);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    cart,
    cartCount,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
