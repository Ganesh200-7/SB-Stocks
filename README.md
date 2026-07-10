📈 FinVault – Stock Trading Platform

FinVault is a **Full Stack MERN (MongoDB, Express.js, React.js, Node.js)** web application that allows users to experience stock trading in a virtual 
environment using virtual money.The platform provides a safe and interactive way to learn stock market concepts without financial risk.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- JWT Authentication
- Secure Password Hashing using bcrypt
- Profile Management
- Upload Profile Picture
- Buy Stocks
- Sell Stocks
- Portfolio Management
- Wallet Balance
- Transaction History
- Watchlist
- Stock Search
- Stock Price Charts

### 🛠️ Admin Features
- Admin Dashboard
- Manage Users
- Monitor Transactions
- Manage Stock Availability

---

# 🏗️ Technology Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Chart.js
- CSS

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Multer
- Mongoose
- dotenv
- CORS

## Database
- MongoDB Atlas

## API Testing
- Thunder Client

---

# 📂 Project Structure

```
FinVault
│
├── frontend
│   ├── src
│   │   ├── admin
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── css
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── scripts
│   ├── seed
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/FinVault.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file.

```env
PORT=5001

MONGO_URI=mongodb://127.0.0.1:27017/SBStocks

JWT_SECRET=FinVault@123
```

Start the backend server.

```bash
node server.js
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:5001
```

---

# 🔐 Authentication

The application uses **JSON Web Tokens (JWT)** for authentication.

- User Login
- Token Generation
- Protected Routes
- Role-based Authorization
- Password Hashing using bcrypt

---

# 📊 Database

MongoDB Atlas is used to store

- Users
- Stocks
- Transactions
  

Mongoose is used as the ODM for database operations.

---

# 🌐 REST APIs

### Authentication

| Method | Endpoint |
|----------|--------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Stocks

| Method | Endpoint |
|----------|----------------|
| GET | /api/stocks |
| GET | /api/stocks/:symbol |

### Trading

| Method | Endpoint |
|----------|----------------|
| POST | /api/trade/buy |
| POST | /api/trade/sell |

### Portfolio

| Method | Endpoint |
|----------|----------------|
| GET | /api/portfolio |

### Transactions

| Method | Endpoint |
|----------|----------------|
| GET | /api/transactions |

### Watchlist

| Method | Endpoint |
|----------|----------------|
| GET | /api/watchlist |
| POST | /api/watchlist |
| DELETE | /api/watchlist/:id |

### Admin

| Method | Endpoint |
|----------|----------------|
| GET | /api/admin/users |
| POST | /api/admin/stocks |
| PUT | /api/admin/stocks/:id |
| DELETE | /api/admin/stocks/:id |

---

# 🧪 Testing

The project was tested using

- Thunder Client
- Manual UI Testing
- REST API Testing
- JWT Authentication Testing
- Database Testing
- Input Validation Testing

---

# 📷 Screenshots

Add screenshots of:

- Landing Page
- Login
- Register
- Dashboard
- Stocks
- Portfolio
- Transactions
- Watchlist
- Profile
- Admin Dashboard

---

# 🚀 Future Enhancements

- Real-Time Stock Market API
- AI Investment Recommendations
- Email Verification
- Password Reset
- Two-Factor Authentication
- Mobile Application
- Push Notifications
- Advanced Portfolio Analytics
- Export Reports to PDF & Excel

---

# 👨‍💻 Developer

**Ganesh Basode**

Department of Computer Science and Engineering

G. Pullaiah College of Engineering and Technology

---

# 📄 License

This project is developed for educational purposes as a Full Stack MERN Project.
