# 🍕 QuickBite Backend REST API

A production-ready, secure, and performant RESTful API for the **QuickBite Food Ordering Platform**, built using **Node.js, Express, MongoDB (Mongoose), and JWT authentication**.

---

## 🚀 Key Features & Production Hardening

- 🔒 **Security Hardening**: Protected with `helmet` HTTP headers, `cors` domain restriction, `express-rate-limit` DDoS prevention, and `10kb` request payload limits.
- 🔑 **Authentication & Role Authorization**: Password hashing with `bcrypt` (12 rounds) and JWT authentication with Bearer tokens for both User and Admin portals.
- 🍔 **Product Catalog & Search**: Paginated food item browsing, text/category search, and quick delivery filtering (`in-30-min`).
- 🛒 **Cart & Order Lifecycle**: Persistent user shopping cart, instant order placement, price snapshotting, and status tracking (`pending` → `confirmed` → `preparing` → `shipped` → `delivered`).
- 📊 **Admin Dashboard**: Real-time analytics API for total revenue, order count, user count, restaurant management, and status updates.
- 🐳 **Container Ready**: Includes production `Dockerfile`, `docker-compose.yml`, data `seed.js` script, and health check monitoring endpoint (`/health`).

---

## 🛠 Tech Stack & Dependencies

| Component | Technology |
|---|---|
| **Runtime** | Node.js (>= 18.0.0) |
| **Framework** | Express.js 4.x |
| **Database** | MongoDB / MongoDB Atlas (Mongoose ODM) |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`) & `bcrypt` |
| **Security & Utilities** | `helmet`, `cors`, `express-rate-limit`, `compression`, `morgan`, `express-validator` |

---

## ⚙ Environment Configuration

Create a `.env` file in the root directory based on `.env.example`:

```env
# Server Configuration
PORT=8000
NODE_ENV=production

# Database Configuration (MongoDB Atlas for Production)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/quickbite?retryWrites=true&w=majority

# Security Configuration
APP_KEY=your_super_secret_jwt_key_32chars_minimum_length
JWT_EXPIRES_IN=7d

# CORS Allowed Origins
CORS_ORIGIN=*

# Rate Limiting (Requests per 15 min window per IP)
RATE_LIMIT_MAX=100
```

---

## 🏁 Quick Start & Local Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Seed Initial Database Data** (Admin, User, Restaurants, Foods):
   ```bash
   npm run seed
   ```
   > **Default Seed Accounts Created:**
   > - **Admin**: `admin@quickbite.com` / `Admin@123456`
   > - **User**: `user@quickbite.com` / `User@123456`

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 🐳 Docker Deployment

Run the complete app and MongoDB database using Docker Compose:

```bash
# Build and start services in detached mode
docker-compose up -d --build

# Seed initial data inside the running container
docker exec -it quickbite-backend npm run seed

# View logs
docker-compose logs -f
```

---

## 📡 API Endpoints Reference

### 🟢 System & Health Check
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | None | Returns uptime, DB status, memory, and system health |

### 👤 User Endpoints (`/user`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/user/signup` | None | Register new user account |
| `POST` | `/user/login` | None | Authenticate user & get JWT token |
| `POST` | `/user/logout` | User | Invalidate session acknowledgment |
| `GET` | `/user/profile` | User | Get authenticated user profile |
| `PUT` | `/user/profile` | User | Update profile details (address, phone, name) |
| `GET` | `/user/cart` | User | Get user shopping cart items |
| `POST` | `/user/cart/:id` | User | Add food product to cart |
| `PUT` | `/user/cart/:id/:qty` | User | Update quantity of item in cart |
| `DELETE` | `/user/cart/:id` | User | Remove item from cart |
| `DELETE` | `/user/cart` | User | Clear entire cart |
| `GET` | `/user/order` | User | Get order history |
| `GET` | `/user/order/:id` | User | Get single order details |
| `POST` | `/user/add-order` | User | Checkout & place order from cart |

### 🍕 Food / Product Endpoints (`/food`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/food` | None | Get paginated foods (`?page=1&limit=20&category=Burgers`) |
| `GET` | `/food/search` | None | Search foods by keyword (`?q=truffle`) |
| `GET` | `/food/categories` | None | Get list of all food categories |
| `GET` | `/food/in-30-min` | None | Get fast delivery foods (`readyTime <= 30`) |
| `GET` | `/food/top/restaurants` | None | Get top open restaurants with foods |
| `GET` | `/food/restaurant/:id` | None | Get all foods from specific restaurant |
| `GET` | `/food/:id` | None | Get details of single food item |

### 👑 Admin Endpoints (`/admin`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/admin/login` | None | Admin authentication (returns admin JWT) |
| `GET` | `/admin/dashboard` | Admin | Overall revenue, order count, user count stats |
| `GET` | `/admin/orders` | Admin | Get all platform orders (`?status=pending`) |
| `PUT` | `/admin/orders/:id/status` | Admin | Update status (`pending`, `confirmed`, `preparing`, `shipped`, `delivered`, `cancelled`) |
| `POST` | `/admin/add-restaurant` | Admin | Register new restaurant |
| `GET` | `/admin/view-restaurants` | Admin | List all registered restaurants |
| `POST` | `/admin/add-food/:id` | Admin | Add menu food item to restaurant |
| `PUT` | `/admin/food/:id` | Admin | Update food item details |
| `DELETE` | `/admin/food/:id` | Admin | Delete food item |

---

## 🧪 Testing & Sample cURL Examples

### 1. Register User
```bash
curl -X POST http://localhost:8000/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "Password@123",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+1987654321"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:8000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@quickbite.com",
    "password": "User@123456"
  }'
```

### 3. Add Item to Cart (Authenticated)
```bash
curl -X POST http://localhost:8000/user/cart/<FOOD_ID> \
  -H "Authorization: Bearer <YOUR_USER_JWT_TOKEN>"
```

### 4. Checkout Order (Authenticated)
```bash
curl -X POST http://localhost:8000/user/add-order \
  -H "Authorization: Bearer <YOUR_USER_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "paidThrough": "COD",
    "deliveryAddress": "789 Ocean Drive, SF, CA",
    "phone": "+14155550199"
  }'
```

### 5. Admin Login & Update Order Status
```bash
# Admin Login
curl -X POST http://localhost:8000/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@quickbite.com",
    "password": "Admin@123456"
  }'

# Update Order Status (Admin Token required)
curl -X PUT http://localhost:8000/admin/orders/<ORDER_ID>/status \
  -H "Authorization: Bearer <YOUR_ADMIN_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{ "orderStatus": "preparing" }'
```

---

## 🚀 Production Hosting Deployment Guide

### Option A: Deployment on Railway (Recommended)
1. Fork or push your codebase to **GitHub**.
2. Log into [Railway.app](https://railway.app) and click **New Project** → **Deploy from GitHub repo**.
3. Create a **MongoDB Database** plugin on Railway or link your **MongoDB Atlas** cluster URI.
4. Add environment variables under **Variables**:
   - `PORT` = `8000`
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `mongodb+srv://...`
   - `APP_KEY` = `your_32char_secret`
5. Railway will automatically detect the `Dockerfile` or `npm start` command and deploy.

### Option B: Deployment on Render
1. Go to [Render.com](https://render.com) → **New Web Service**.
2. Connect your GitHub repository.
3. Set **Environment** to `Node`, Build Command to `npm install`, and Start Command to `npm start`.
4. Configure environment variables (`MONGODB_URI`, `APP_KEY`, `NODE_ENV=production`).

---

## 📄 License

This project is open-source and released under the **MIT License**.
