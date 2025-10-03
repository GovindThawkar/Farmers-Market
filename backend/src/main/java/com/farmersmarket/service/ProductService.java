package com.farmersmarket.service;

import com.farmersmarket.model.Product;
import com.farmersmarket.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getAvailableProducts() {
        return productRepository.findByAvailable(true);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryAndAvailable(category, true);
    }

    public List<Product> getProductsByFarmer(String farmerId) {
        return productRepository.findByFarmerIdAndAvailable(farmerId, true);
    }

    public List<Product> searchProducts(String searchTerm) {
        return productRepository.findByNameContainingIgnoreCase(searchTerm);
    }

    public List<Product> getOrganicProducts() {
        return productRepository.findByOrganic(true);
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(String id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());
        product.setCategory(productDetails.getCategory());
        product.setImageUrls(productDetails.getImageUrls());
        product.setUnit(productDetails.getUnit());
        product.setOrganic(productDetails.isOrganic());
        product.setAvailable(productDetails.isAvailable());
        product.setUpdatedAt(java.time.LocalDateTime.now());

        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.setAvailable(false);
        productRepository.save(product);
    }

    public void updateProductQuantity(String productId, int quantitySold) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        int newQuantity = product.getQuantity() - quantitySold;
        if (newQuantity < 0) {
            throw new RuntimeException("Insufficient product quantity");
        }

        product.setQuantity(newQuantity);
        product.setUpdatedAt(java.time.LocalDateTime.now());
        productRepository.save(product);
    }
}
