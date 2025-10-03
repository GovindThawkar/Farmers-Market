package com.farmersmarket.config;

import com.farmersmarket.model.Product;
import com.farmersmarket.model.User;
import com.farmersmarket.repository.ProductRepository;
import com.farmersmarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize data if no users exist
        if (userRepository.count() == 0) {
            initializeUsers();
            initializeProducts();
        }
    }

    private void initializeUsers() {
        // Create admin user
        User admin = new User();
        admin.setFirstName("Admin");
        admin.setLastName("User");
        admin.setEmail("admin@farmersmarket.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("ADMIN");
        admin.setPhoneNumber("555-0100");
        admin.setAddress("123 Admin Street");
        admin.setCity("Admin City");
        admin.setState("AC");
        admin.setZipCode("12345");
        userRepository.save(admin);

        // Create farmer users
        User farmer1 = new User();
        farmer1.setFirstName("John");
        farmer1.setLastName("Smith");
        farmer1.setEmail("john@greenfarm.com");
        farmer1.setPassword(passwordEncoder.encode("farmer123"));
        farmer1.setRole("FARMER");
        farmer1.setPhoneNumber("555-0101");
        farmer1.setAddress("456 Farm Road");
        farmer1.setCity("Rural Town");
        farmer1.setState("RT");
        farmer1.setZipCode("54321");
        userRepository.save(farmer1);

        User farmer2 = new User();
        farmer2.setFirstName("Sarah");
        farmer2.setLastName("Johnson");
        farmer2.setEmail("sarah@organicvalley.com");
        farmer2.setPassword(passwordEncoder.encode("farmer123"));
        farmer2.setRole("FARMER");
        farmer2.setPhoneNumber("555-0102");
        farmer2.setAddress("789 Valley Lane");
        farmer2.setCity("Green Valley");
        farmer2.setState("GV");
        farmer2.setZipCode("67890");
        userRepository.save(farmer2);

        // Create customer users
        User customer1 = new User();
        customer1.setFirstName("Alice");
        customer1.setLastName("Brown");
        customer1.setEmail("alice@email.com");
        customer1.setPassword(passwordEncoder.encode("customer123"));
        customer1.setRole("CUSTOMER");
        customer1.setPhoneNumber("555-0103");
        customer1.setAddress("321 City Street");
        customer1.setCity("Metro City");
        customer1.setState("MC");
        customer1.setZipCode("11111");
        userRepository.save(customer1);

        User customer2 = new User();
        customer2.setFirstName("Bob");
        customer2.setLastName("Wilson");
        customer2.setEmail("bob@email.com");
        customer2.setPassword(passwordEncoder.encode("customer123"));
        customer2.setRole("CUSTOMER");
        customer2.setPhoneNumber("555-0104");
        customer2.setAddress("654 Suburb Ave");
        customer2.setCity("Suburbia");
        customer2.setState("SB");
        customer2.setZipCode("22222");
        userRepository.save(customer2);
    }

    private void initializeProducts() {
        List<User> farmers = userRepository.findByRole("FARMER");
        if (farmers.isEmpty())
            return;

        User farmer1 = farmers.get(0);
        User farmer2 = farmers.size() > 1 ? farmers.get(1) : farmers.get(0);

        // Products from Farmer 1
        Product product1 = new Product();
        product1.setName("Fresh Organic Tomatoes");
        product1.setDescription(
                "Juicy, vine-ripened organic tomatoes grown without pesticides. Perfect for salads, sauces, and cooking.");
        product1.setPrice(new BigDecimal("4.99"));
        product1.setQuantity(50);
        product1.setCategory("vegetables");
        product1.setFarmerId(farmer1.getId());
        product1.setUnit("lb");
        product1.setOrganic(true);
        product1.setAvailable(true);
        product1.setImageUrls(Arrays.asList("https://images.unsplash.com/photo-1592924357228-91b4e4a8d5a3?w=400"));
        productRepository.save(product1);

        Product product2 = new Product();
        product2.setName("Crisp Organic Lettuce");
        product2.setDescription(
                "Fresh, crisp organic lettuce perfect for salads and sandwiches. Grown in nutrient-rich soil.");
        product2.setPrice(new BigDecimal("2.99"));
        product2.setQuantity(30);
        product2.setCategory("vegetables");
        product2.setFarmerId(farmer1.getId());
        product2.setUnit("head");
        product2.setOrganic(true);
        product2.setAvailable(true);
        product2.setImageUrls(Arrays.asList("https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400"));
        productRepository.save(product2);

        Product product3 = new Product();
        product3.setName("Sweet Organic Carrots");
        product3.setDescription(
                "Sweet and crunchy organic carrots, rich in vitamins and minerals. Perfect for snacking or cooking.");
        product3.setPrice(new BigDecimal("3.49"));
        product3.setQuantity(40);
        product3.setCategory("vegetables");
        product3.setFarmerId(farmer1.getId());
        product3.setUnit("lb");
        product3.setOrganic(true);
        product3.setAvailable(true);
        product3.setImageUrls(Arrays.asList("https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400"));
        productRepository.save(product3);

        // Products from Farmer 2
        Product product4 = new Product();
        product4.setName("Fresh Organic Strawberries");
        product4.setDescription(
                "Sweet, juicy organic strawberries picked at peak ripeness. Perfect for desserts and smoothies.");
        product4.setPrice(new BigDecimal("6.99"));
        product4.setQuantity(25);
        product4.setCategory("fruits");
        product4.setFarmerId(farmer2.getId());
        product4.setUnit("lb");
        product4.setOrganic(true);
        product4.setAvailable(true);
        product4.setImageUrls(Arrays.asList("https://images.unsplash.com/photo-1464965911861-f74604f4a762?w=400"));
        productRepository.save(product4);

        Product product5 = new Product();
        product5.setName("Organic Blueberries");
        product5.setDescription(
                "Antioxidant-rich organic blueberries, perfect for baking, smoothies, or eating fresh.");
        product5.setPrice(new BigDecimal("8.99"));
        product5.setQuantity(20);
        product5.setCategory("fruits");
        product5.setFarmerId(farmer2.getId());
        product5.setUnit("lb");
        product5.setOrganic(true);
        product5.setAvailable(true);
        product5.setImageUrls(Arrays.asList("https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?w=400"));
        productRepository.save(product5);

        Product product6 = new Product();
        product6.setName("Fresh Organic Spinach");
        product6.setDescription(
                "Nutrient-dense organic spinach, perfect for salads, smoothies, and cooking. Rich in iron and vitamins.");
        product6.setPrice(new BigDecimal("3.99"));
        product6.setQuantity(35);
        product6.setCategory("vegetables");
        product6.setFarmerId(farmer2.getId());
        product6.setUnit("bunch");
        product6.setOrganic(true);
        product6.setAvailable(true);
        product6.setImageUrls(Arrays.asList("https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400"));
        productRepository.save(product6);

        Product product7 = new Product();
        product7.setName("Organic Bell Peppers");
        product7.setDescription(
                "Colorful organic bell peppers in red, yellow, and green. Sweet and crunchy, perfect for cooking and snacking.");
        product7.setPrice(new BigDecimal("4.49"));
        product7.setQuantity(30);
        product7.setCategory("vegetables");
        product7.setFarmerId(farmer1.getId());
        product7.setUnit("lb");
        product7.setOrganic(true);
        product7.setAvailable(true);
        product7.setImageUrls(Arrays.asList("https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400"));
        productRepository.save(product7);

        Product product8 = new Product();
        product8.setName("Fresh Organic Apples");
        product8.setDescription(
                "Crisp and sweet organic apples, perfect for eating fresh or baking. Multiple varieties available.");
        product8.setPrice(new BigDecimal("5.99"));
        product8.setQuantity(60);
        product8.setCategory("fruits");
        product8.setFarmerId(farmer2.getId());
        product8.setUnit("lb");
        product8.setOrganic(true);
        product8.setAvailable(true);
        product8.setImageUrls(Arrays.asList("https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"));
        productRepository.save(product8);
    }
}
