import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./api/axios";
import StockChart from "./pages/StockChart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Watchlist from "./pages/Watchlist";
import Stocks from "./pages/Stocks";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Users from "./admin/Users";
import AllOrders from "./admin/AllOrders";
import AdminStockChart from "./admin/AdminStockChart";
import Admin from "./admin/Admin";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
<Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/orders" element={<AllOrders />} />
<Route path="/admin/stocks" element={<AdminStockChart />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={<Users />} />

        <Route
          path="/portfolio"
          element={
            <ProtectedRoute user={user}>
              <Portfolio />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute user={user}>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute user={user}>
              <Watchlist />
            </ProtectedRoute>
          }
        />
<Route
  path="/stock-chart/:symbol"
  element={
    <ProtectedRoute>
      <StockChart />
    </ProtectedRoute>
  }
/>
        <Route
          path="/stocks"
          element={
            <ProtectedRoute user={user}>
              <Stocks />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;