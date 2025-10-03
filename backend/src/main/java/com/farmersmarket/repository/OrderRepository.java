package com.farmersmarket.repository;

import com.farmersmarket.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByCustomerId(String customerId);

    List<Order> findByStatus(String status);

    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    @Query("{'orderItems.productId': ?0}")
    List<Order> findByProductId(String productId);

    @Query("{'customerId': ?0, 'status': ?1}")
    List<Order> findByCustomerIdAndStatus(String customerId, String status);
}
