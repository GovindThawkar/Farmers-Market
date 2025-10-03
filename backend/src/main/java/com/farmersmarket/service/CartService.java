package com.farmersmarket.service;

import com.farmersmarket.model.Cart;
import com.farmersmarket.model.Product;
import com.farmersmarket.repository.CartRepository;
import com.farmersmarket.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart getOrCreateCart(String customerId) {
        Optional<Cart> cart = cartRepository.findByCustomerId(customerId);
        if (cart.isPresent()) {
            return cart.get();
        } else {
            Cart newCart = new Cart(customerId);
            newCart.setCartItems(new ArrayList<>());
            return cartRepository.save(newCart);
        }
    }

    public Cart addToCart(String customerId, String productId, Integer quantity) {
        Cart cart = getOrCreateCart(customerId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        if (!product.isAvailable() || product.getQuantity() < quantity) {
            throw new RuntimeException("Product not available or insufficient quantity");
        }

        List<Cart.CartItem> cartItems = cart.getCartItems();
        if (cartItems == null) {
            cartItems = new ArrayList<>();
        }

        // Check if product already exists in cart
        boolean productExists = false;
        for (Cart.CartItem item : cartItems) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                productExists = true;
                break;
            }
        }

        if (!productExists) {
            Cart.CartItem newItem = new Cart.CartItem(
                    productId,
                    product.getName(),
                    quantity,
                    product.getPrice().doubleValue(),
                    product.getImageUrls() != null && !product.getImageUrls().isEmpty()
                            ? product.getImageUrls().get(0)
                            : null);
            cartItems.add(newItem);
        }

        cart.setCartItems(cartItems);
        cart.setUpdatedAt(java.time.LocalDateTime.now());

        return cartRepository.save(cart);
    }

    public Cart updateCartItem(String customerId, String productId, Integer quantity) {
        Cart cart = getOrCreateCart(customerId);
        List<Cart.CartItem> cartItems = cart.getCartItems();

        for (Cart.CartItem item : cartItems) {
            if (item.getProductId().equals(productId)) {
                if (quantity <= 0) {
                    cartItems.remove(item);
                } else {
                    item.setQuantity(quantity);
                }
                break;
            }
        }

        cart.setCartItems(cartItems);
        cart.setUpdatedAt(java.time.LocalDateTime.now());

        return cartRepository.save(cart);
    }

    public Cart removeFromCart(String customerId, String productId) {
        Cart cart = getOrCreateCart(customerId);
        List<Cart.CartItem> cartItems = cart.getCartItems();

        cartItems.removeIf(item -> item.getProductId().equals(productId));

        cart.setCartItems(cartItems);
        cart.setUpdatedAt(java.time.LocalDateTime.now());

        return cartRepository.save(cart);
    }

    public void clearCart(String customerId) {
        cartRepository.deleteByCustomerId(customerId);
    }

    public Cart getCart(String customerId) {
        return getOrCreateCart(customerId);
    }
}
