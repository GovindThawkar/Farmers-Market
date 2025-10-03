# Farmers Market E-commerce Application

A full-stack e-commerce web application for local farmers to sell organic products directly to customers. Built with React.js frontend and Spring Boot backend, using MongoDB for data storage.

## Features

### User Authentication & Authorization

- User registration and login for farmers, customers, and admins
- JWT-based authentication for secure API access
- Password hashing with BCrypt
- Role-based access control

### Farmer Dashboard

- Add, edit, and delete products
- View orders for their products
- Manage product inventory and availability
- Track sales and customer orders

### Customer Functionality

- Browse products by category
- Search products by name and description
- Add products to cart and place orders
- View order history and status
- Responsive design for mobile and desktop

### Admin Panel

- View all users, products, and orders
- Manage user accounts and product listings
- Monitor platform activity and sales

### Product Management

- Product details: name, description, price, quantity, category, images
- Organic certification tracking
- Inventory management
- Category-based organization

## Tech Stack

### Frontend

- **React.js** 18.2.0 with functional components and hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Context API** for state management

### Backend

- **Spring Boot** 3.2.0
- **Spring Security** with JWT authentication
- **Spring Data MongoDB** for database operations
- **Maven** for dependency management
- **Java 17**

### Database

- **MongoDB** for data storage
- Collections: users, products, orders, carts

## Project Structure

```
farmers-market/
├── backend/
│   ├── src/main/java/com/farmersmarket/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # REST controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── model/          # MongoDB entities
│   │   ├── repository/     # Data repositories
│   │   ├── security/       # Security configuration
│   │   ├── service/        # Business logic
│   │   └── util/           # Utility classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── contexts/       # React context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Prerequisites

- **Java 17** or higher
- **Node.js** 16 or higher
- **MongoDB** 4.4 or higher
- **Maven** 3.6 or higher

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd farmers-market
```

### 2. Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Update the MongoDB connection in `src/main/resources/application.properties`:

```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=farmers_market
```

3. Build and run the Spring Boot application:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will start on `http://localhost:3000`

### 4. Database Setup

1. Make sure MongoDB is running on your system
2. The application will automatically create the database and collections
3. Sample data will be loaded on first startup

## Sample Data

The application comes with pre-loaded sample data:

### Users

- **Admin**: admin@farmersmarket.com / admin123
- **Farmer 1**: john@greenfarm.com / farmer123
- **Farmer 2**: sarah@organicvalley.com / farmer123
- **Customer 1**: alice@email.com / customer123
- **Customer 2**: bob@email.com / customer123

### Products

- Fresh Organic Tomatoes
- Crisp Organic Lettuce
- Sweet Organic Carrots
- Fresh Organic Strawberries
- Organic Blueberries
- Fresh Organic Spinach
- Organic Bell Peppers
- Fresh Organic Apples

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products/public` - Get all available products
- `GET /api/products/public/{id}` - Get product by ID
- `GET /api/products/public/category/{category}` - Get products by category
- `GET /api/products/public/search?q={query}` - Search products
- `POST /api/products` - Create product (Farmer/Admin only)
- `PUT /api/products/{id}` - Update product (Farmer/Admin only)
- `DELETE /api/products/{id}` - Delete product (Farmer/Admin only)

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/{productId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (Admin) or user's orders
- `GET /api/orders/{id}` - Get order by ID
- `PUT /api/orders/{id}/status` - Update order status
- `PUT /api/orders/{id}` - Update order
- `DELETE /api/orders/{id}` - Delete order

### Admin

- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/{id}` - Get user by ID
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Deactivate user

## Usage

### For Customers

1. Register or login to your account
2. Browse products by category or search
3. Add products to cart
4. Proceed to checkout
5. View order history

### For Farmers

1. Register as a farmer or login
2. Access the farmer dashboard
3. Add your products with details
4. Manage inventory and availability
5. View orders for your products

### For Admins

1. Login with admin credentials
2. Access the admin dashboard
3. Monitor all users, products, and orders
4. Manage the platform

## Development

### Backend Development

- The backend uses Spring Boot with Maven
- Main application class: `FarmersMarketApplication.java`
- Controllers handle HTTP requests
- Services contain business logic
- Repositories handle database operations

### Frontend Development

- Built with React 18 and modern hooks
- Uses Context API for state management
- Tailwind CSS for styling
- Axios for API communication

## Security Features

- JWT-based authentication
- Password hashing with BCrypt
- CORS configuration for frontend-backend communication
- Role-based access control
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
