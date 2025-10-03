# Farmers Market E-commerce Setup Guide

This guide will walk you through setting up and running the Farmers Market e-commerce application locally.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Java 17** or higher
- **Node.js** 16 or higher
- **MongoDB** 4.4 or higher
- **Maven** 3.6 or higher
- **Git** (for cloning the repository)

## Quick Start

### Option 1: Using Docker (Recommended)

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd farmers-market
   ```

2. **Start all services with Docker Compose:**

   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - MongoDB: localhost:27017

### Option 2: Manual Setup

#### Step 1: Database Setup

1. **Install and start MongoDB:**

   ```bash
   # On macOS with Homebrew
   brew install mongodb-community
   brew services start mongodb-community

   # On Ubuntu/Debian
   sudo apt-get install mongodb
   sudo systemctl start mongodb

   # On Windows
   # Download and install from https://www.mongodb.com/try/download/community
   ```

2. **Verify MongoDB is running:**
   ```bash
   mongosh
   # or
   mongo
   ```

#### Step 2: Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Build the project:**

   ```bash
   mvn clean install
   ```

3. **Run the Spring Boot application:**

   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

#### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## Verification

### 1. Check Backend Health

Visit `http://localhost:8080/api/auth/me` in your browser. You should see a 401 Unauthorized response (this is expected without authentication).

### 2. Check Frontend

Visit `http://localhost:3000` in your browser. You should see the Farmers Market homepage.

### 3. Test Sample Data

The application comes with pre-loaded sample data. You can test with these accounts:

**Admin Account:**

- Email: admin@farmersmarket.com
- Password: admin123

**Farmer Account:**

- Email: john@greenfarm.com
- Password: farmer123

**Customer Account:**

- Email: alice@email.com
- Password: customer123

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

```
Error: Could not connect to MongoDB
```

**Solution:**

- Ensure MongoDB is running: `brew services start mongodb-community` (macOS) or `sudo systemctl start mongodb` (Linux)
- Check if MongoDB is listening on port 27017: `netstat -an | grep 27017`

#### 2. Port Already in Use

```
Error: Port 8080 is already in use
```

**Solution:**

- Kill the process using port 8080: `lsof -ti:8080 | xargs kill -9`
- Or change the port in `backend/src/main/resources/application.properties`

#### 3. Node Modules Issues

```
Error: Cannot find module
```

**Solution:**

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

#### 4. Maven Build Issues

```
Error: Failed to execute goal
```

**Solution:**

- Clean Maven cache: `mvn clean`
- Update dependencies: `mvn dependency:resolve`
- Rebuild: `mvn clean install`

### Logs and Debugging

#### Backend Logs

```bash
# View Spring Boot logs
tail -f logs/spring.log

# Or check console output when running with mvn spring-boot:run
```

#### Frontend Logs

```bash
# Check browser console for errors
# Or run with verbose logging
npm start -- --verbose
```

#### MongoDB Logs

```bash
# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log  # macOS
tail -f /var/log/mongodb/mongodb.log          # Linux
```

## Development Workflow

### Making Changes

1. **Backend Changes:**

   - Modify Java files in `backend/src/main/java/`
   - The application will auto-reload with Spring Boot DevTools
   - Test API endpoints with Postman or curl

2. **Frontend Changes:**

   - Modify React components in `frontend/src/`
   - The browser will auto-reload with hot reloading
   - Check browser console for errors

3. **Database Changes:**
   - Modify models in `backend/src/main/java/com/farmersmarket/model/`
   - Update repositories if needed
   - Restart the backend application

### Testing the Application

1. **Register a new user:**

   - Go to http://localhost:3000/register
   - Fill out the registration form
   - Choose role: Customer, Farmer, or Admin

2. **Test as a Customer:**

   - Browse products at http://localhost:3000/products
   - Add items to cart
   - Proceed to checkout
   - View order history

3. **Test as a Farmer:**

   - Login with farmer credentials
   - Go to Farmer Dashboard
   - Add new products
   - View orders for your products

4. **Test as an Admin:**
   - Login with admin credentials
   - Go to Admin Dashboard
   - View all users, products, and orders

## Production Deployment

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/farmers_market

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Build for Production

1. **Backend:**

   ```bash
   cd backend
   mvn clean package -Pproduction
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

### Docker Production

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/login`    | User login        | No            |
| POST   | `/api/auth/register` | User registration | No            |
| GET    | `/api/auth/me`       | Get current user  | Yes           |

### Product Endpoints

| Method | Endpoint                    | Description       | Auth Required |
| ------ | --------------------------- | ----------------- | ------------- |
| GET    | `/api/products/public`      | Get all products  | No            |
| GET    | `/api/products/public/{id}` | Get product by ID | No            |
| POST   | `/api/products`             | Create product    | Farmer/Admin  |
| PUT    | `/api/products/{id}`        | Update product    | Farmer/Admin  |
| DELETE | `/api/products/{id}`        | Delete product    | Farmer/Admin  |

### Cart Endpoints

| Method | Endpoint                | Description           | Auth Required |
| ------ | ----------------------- | --------------------- | ------------- |
| GET    | `/api/cart`             | Get user's cart       | Customer      |
| POST   | `/api/cart/add`         | Add item to cart      | Customer      |
| PUT    | `/api/cart/update`      | Update cart item      | Customer      |
| DELETE | `/api/cart/remove/{id}` | Remove item from cart | Customer      |

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs for error messages
3. Ensure all prerequisites are installed correctly
4. Verify that all services are running on the correct ports

For additional help, please refer to the main README.md file or create an issue in the repository.
