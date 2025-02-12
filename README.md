# ShopNest - E-commerce Website Builder

## 🚀 Introduction

ShopNest is a **multi-tenant e-commerce website builder** that allows users to create and manage their own online stores effortlessly. Each store gets a unique subdomain (e.g., `mystore.shopnest.com`) and can also integrate a custom domain.

## 🌟 Features

- 🛍️ **Multi-Tenancy Support** – Each store has its own products, orders, and settings.
- 🔗 **Custom Domains & Subdomains** – Supports `mystore.shopnest.com` and custom domains like `mystore.com`.
- 📦 **Product & Order Management** – Store owners can add products and manage orders.
- 💳 **Payment Integration** – Supports multiple payment gateways.
- 🎨 **Customizable Storefronts** – Users can select themes and modify layouts.
- 📊 **Analytics & Reports** – Insights on sales, orders, and traffic.

## 🏗️ Tech Stack

- **Frontend:** Next.js (React, TailwindCSS)
- **Backend:** NestJS (Node.js, Express, Prisma)
- **Database:** PostgreSQL (Multi-tenancy setup)
- **Authentication:** NextAuth / JWT
- **Storage:** AWS S3 (for product images)
- **Deployment:** Vercel (Frontend), AWS / DigitalOcean (Backend, Database)

## 🎯 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/shopnest.git
cd shopnest
```

### 2️⃣ Install Dependencies

```bash
npm install  # or yarn install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file and add the necessary environment variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/shopnest
NEXTAUTH_SECRET=your_secret
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4️⃣ Run the Development Server

#### Start Backend (NestJS)

```bash
cd backend
npm run start:dev
```

#### Start Frontend (Next.js)

```bash
cd frontend
npm run dev
```

## 🌍 Deployment

- **Frontend:** Deploy on Vercel
- **Backend:** Deploy on AWS / DigitalOcean
- **Database:** PostgreSQL managed service (e.g., Supabase, RDS)
- **Reverse Proxy:** Nginx for handling subdomains

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

We welcome contributions! Feel free to open an issue or submit a pull request.

---

🚀 **Build your own e-commerce empire with ShopNest!**
