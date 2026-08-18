# 🍕 Zymeal Backend REST API

A production-ready, secure, and performant RESTful API for the **Zymeal Gourmet Food Ordering Platform**, built using **Node.js, Express, MongoDB (Mongoose), and JWT authentication**.

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
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/zymeal?retryWrites=true&w=majority

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

2. **Seed Initial Database (Admin, User & Menu Items in INR ₹)**:
   ```bash
   npm run seed
   ```

3. **Start Development Server (with nodemon auto-reload)**:
   ```bash
   npm run dev
   ```

4. **Access the Health Check Endpoint**:
   ```http
   GET http://localhost:8000/health
   ```

> 🔑 **Default Demo Accounts**:
> - **Admin**: `admin@zymeal.com` / `Admin@123456`
> - **User**: `user@zymeal.com` / `User@123456`

---

## 🌐 Production Deployments

- **Frontend App**: [https://zymeal.vercel.app](https://zymeal.vercel.app)
- **Backend API**: `https://quickbite-llg6.onrender.com`
