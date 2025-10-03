package com.farmersmarket.repository;

import com.farmersmarket.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByFarmerId(String farmerId);

    List<Product> findByCategory(String category);

    List<Product> findByAvailable(boolean available);

    List<Product> findByOrganic(boolean organic);

    @Query("{'name': {$regex: ?0, $options: 'i'}}")
    List<Product> findByNameContainingIgnoreCase(String name);

    @Query("{'category': ?0, 'available': true}")
    List<Product> findByCategoryAndAvailable(String category, boolean available);

    @Query("{'farmerId': ?0, 'available': true}")
    List<Product> findByFarmerIdAndAvailable(String farmerId, boolean available);
}
