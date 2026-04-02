# QuickBite Backend

A robust and efficient REST API for the QuickBite Food Ordering Application. This backend service powers the mobile app features such as user authentication, browsing food categories, placing orders, and more, as well as providing an admin console functionality.

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for routing and middleware
- **MongoDB & Mongoose** - NoSQL Database and ODM
- **JSON Web Token (JWT)** - Authentication and authorization
- **Bcrypt** - Password hashing
- **Express Validator** - Request data validation

## ✨ Features

- **User Authentication:** Secure registration and login with JWT.
- **Admin Authentication:** Protected admin console access.
- **Products & Categories:** Manage food items and menus dynamically.
- **Order Management:** Place, track, and manage food orders.
- **Security:** Standard middleware protection (Helmet) and data validation.

## 🛠 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShreyashSrivastavaa/QuickBite.git
   cd QuickBite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Duplicate the `.env.example` file, rename it to `.env`, and update the database credentials.
   ```bash
   cp .env.example .env
   ```

4. **Run the server:**
   ```bash
   # Development mode with nodemon
   npm run start
   ```

## 🔐 Environment Variables

Ensure the following variables are set in your `.env` file:
- `MONGODB_URI`
- `APP_KEY`

## 📡 API Endpoints

- **Users:** `/users/...` (Authentication, Profile)
- **Admin:** `/admin/...` (Dashboard, Product Management)
- **Products:** `/products/...` (Listing, Searching)
- **Orders:** `/orders/...` (Checkout, Order History)

## 📁 Folder Structure

```
.
├── config/           # App configuration and constants
├── controllers/      # Route handler functions
├── images/           # Static image uploads
├── middlewares/      # Custom middlewares (auth, validators)
├── models/           # Mongoose schemas
├── routes/           # Express router definitions
├── .env.example      # Example environment variables
├── app.js            # Entry point for the application
└── package.json      # Dependencies and scripts
```

## 👤 Author

**Ramboo**

## 📄 License

This project is licensed under the **MIT License**.
