package com.farmersmarket.controller;

import com.farmersmarket.model.Cart;
import com.farmersmarket.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Authentication authentication) {
        String customerId = getCurrentUserId(authentication);
        Cart cart = cartService.getCart(customerId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> request, Authentication authentication) {
        try {
            String customerId = getCurrentUserId(authentication);
            String productId = (String) request.get("productId");
            Integer quantity = (Integer) request.get("quantity");

            Cart cart = cartService.addToCart(customerId, productId, quantity);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCartItem(@RequestBody Map<String, Object> request, Authentication authentication) {
        try {
            String customerId = getCurrentUserId(authentication);
            String productId = (String) request.get("productId");
            Integer quantity = (Integer) request.get("quantity");

            Cart cart = cartService.updateCartItem(customerId, productId, quantity);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable String productId, Authentication authentication) {
        try {
            String customerId = getCurrentUserId(authentication);
            Cart cart = cartService.removeFromCart(customerId, productId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(Authentication authentication) {
        try {
            String customerId = getCurrentUserId(authentication);
            cartService.clearCart(customerId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cart cleared successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    private String getCurrentUserId(Authentication authentication) {
        // This is a simplified implementation
        // In a real application, you would get the user ID from the JWT token or
        // database
        return authentication.getName(); // This returns the email, you might want to get the actual user ID
    }
}
