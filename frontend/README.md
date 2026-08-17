# 🍔 QuickBite Frontend Web Application

The official web application frontend for **QuickBite Food Ordering Platform**, built using **React, Vite, Lucide Icons, and Vanilla CSS design system**.

---

## 🎨 Features & Visual Highlights

- 💎 **Dark Glassmorphism Design System**: Sleek backdrop blurs, subtle glowing borders, and custom typography (`Outfit` & `Inter`).
- ⚡ **Real-Time Product Search & Filtering**: Instant debounced keyword search, category pills, and quick express delivery filters (`< 30 mins`).
- 🛒 **Interactive Shopping Cart**: Persistent cart drawer, free delivery threshold indicator, quantity modifiers, and price calculation.
- 💳 **Seamless Checkout**: Address collection, payment method selector (COD, Credit Card, UPI), and order placement confirmation.
- 📦 **Order Tracking Pipeline**: Visual status tracking (`pending` → `confirmed` → `preparing` → `shipped` → `delivered`).
- 👑 **Admin Console**: Dashboard stats (revenue, active kitchen orders, registered users), status editor, and product creator form.

---

## 🛠 Tech Stack

| Component | Technology |
|---|---|
| **Framework** | React 18 + Vite |
| **Icons** | Lucide React |
| **HTTP Client** | Axios (JWT token injection & error interceptors) |
| **Styling** | Vanilla CSS (CSS Variables, Glassmorphism, Responsive) |

---

## ⚙ Environment Variables

Create a `.env` file in `frontend/`:

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🏁 Quick Start & Development

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   > The app will start locally at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🚀 Deployment Guide

### Option A: Vercel (Recommended for Web)
1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your project and select **Root Directory**: `frontend`.
4. Add environment variable:
   - `VITE_API_BASE_URL` = `https://your-backend-domain.up.railway.app`
5. Click **Deploy**!

### Option B: Netlify
1. Connect your repo on [Netlify](https://app.netlify.com).
2. Set Base Directory: `frontend`, Build Command: `npm run build`, Publish Directory: `dist`.
3. Set Environment Variable `VITE_API_BASE_URL`.

### Option C: Docker Container
```bash
cd frontend
docker build -t quickbite-frontend .
docker run -d -p 80:80 quickbite-frontend
```
