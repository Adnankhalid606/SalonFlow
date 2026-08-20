# SalonFlow

*A modern Salon & Barbershop Management System built with the MERN Stack.*

---

# 📌 Overview

SalonFlow is a full-stack web application designed to help salon and barbershop owners manage their daily business operations from a single dashboard.

The application focuses on tracking employees, services, daily transactions, expenses, withdrawals, earnings, and business analytics while providing a clean and user-friendly interface.

Unlike a simple expense tracker, SalonFlow acts as a lightweight Point of Sale (POS) and business management system for small and medium-sized salons.

This project is being built as both:

- A real-world software solution for a local salon.
- A portfolio project to learn modern full-stack development with React, Node.js, Express, and MongoDB.

---

# 🎯 Goals

- Simplify daily salon management.
- Track employee earnings automatically.
- Manage shop income and expenses.
- Generate useful reports and analytics.
- Learn real-world software architecture and business logic.
- Improve React integration and frontend development skills.

---

# ✨ Features

## Authentication

- Secure Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Auto Logout after inactivity
- Role-based Authorization

---

## Employee Management

- Add Employees
- Edit Employees
- Delete Employees
- Employee Profile
- Profile Image Upload
- Employee Status
  - Active
  - Break
  - Suspended
- Custom Revenue Percentage

---

## Service Management

- Create Services
- Update Prices
- Delete Services
- Enable/Disable Services
- Search & Filter
- Sorting
- Service Categories

Example:

- Hair Cut
- Beard
- Hair Wash
- Facial
- Massage
- Hair Color

---

## Transaction Management

Create daily work records by selecting:

- Employee
- Service
- Discount
  - Percentage
  - Fixed Amount
- Notes

Automatically calculates:

- Final Price
- Employee Share
- Shop Share

Transaction Status:

- Pending
- Closed

Pending transactions remain in today's working session.

After closing the day, they appear in History.

---

## Expense Management

Track shop expenses including:

- Electricity
- Tea
- Cleaning
- Product Purchase
- Rent
- Maintenance
- Custom Expenses

Each expense automatically affects the shop balance.

---

## Withdraw Management

Track money withdrawn by the owner.

Every withdrawal includes:

- Amount
- Note
- Date
- Admin

---

## Dashboard

Interactive dashboard displaying:

- Today's Income
- Today's Expenses
- Shop Balance
- Employee Earnings
- Total Services
- Active Employees
- Recent Transactions
- Quick Actions
- Business Insights

---

## Reports

Generate reports by:

- Daily
- Weekly
- Monthly
- Yearly

Future support:

- PDF Export
- Excel Export

---

## Graphs

Business analytics using charts.

Examples:

- Revenue Graph
- Expense Graph
- Employee Performance
- Service Popularity
- Monthly Growth

---

# 🏗️ Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- TanStack Table
- Recharts
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Zod

---

## Tools

- Postman
- Git
- GitHub
- VS Code

---

# 📂 Project Structure

## Backend

```
backend/

src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validations/
├── utils/
├── uploads/
└── app.js
```

---

## Frontend

```
frontend/

src/
│
├── assets/
├── components/
├── contexts/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
└── App.jsx
```

---

# 🗄️ Database Design

Main Collections:

- Users
- Shops
- Employees
- Services
- Transactions
- Expenses
- Withdrawals

Each business record belongs to a specific **Shop**, making the system scalable for supporting multiple salons in the future.

---

# 🔐 User Roles

## Super Admin

- Creates Shops
- Creates Admin Accounts
- System Management

---

## Admin

- Manage Employees
- Manage Services
- Manage Transactions
- Manage Expenses
- Manage Withdrawals
- View Reports
- Dashboard Access

---

## Future Roles

- Manager
- Viewer
- Accountant

---

# 💰 Revenue Sharing

Each employee can have a custom earning percentage.

Example:

Service Price

```
500 PKR
```

Employee Share

```
40%
```

Owner Share

```
60%
```

The system automatically calculates and stores the earnings for every transaction.

---

# 📊 Wallet Logic

The application does **not** store wallet balance directly.

Instead, it calculates the balance dynamically.

```
Total Income
− Total Expenses
− Total Withdrawals
= Live Shop Balance
```

This approach ensures financial consistency and avoids synchronization issues.

---

# 🚀 Future Features

- Google OAuth Login
- Customer Management
- Inventory Management
- Notifications
- Backup & Restore
- Multi-Branch Support
- Online Booking
- Barcode/Receipt Printing
- Mobile Responsive Enhancements
- PWA Support

---

# 📚 Learning Objectives

This project is intended to strengthen understanding of:

- React Architecture
- API Integration
- Context API
- Authentication
- Role-based Authorization
- Business Logic
- Financial Calculations
- MongoDB Relationships
- Aggregation Pipelines
- Dashboard Design
- Data Visualization
- Clean Code
- Scalable Project Structure

---

# 📌 Current Status

Project planning is complete.

Development is currently focused on building the MVP in the following order:

- Authentication
- Employee Management
- Service Management
- Transaction Management
- Expense Management
- Withdraw Management
- Dashboard
- Reports
- Graphs
- UI/UX Improvements

---

# 🤝 Contributing

Contributions, suggestions, and feedback are always welcome.

If you have ideas for improving the project, feel free to open an issue or submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ Project Vision

SalonFlow aims to become a practical, production-style management system for salons and barbershops while serving as a comprehensive learning project for mastering the MERN stack through real business requirements.