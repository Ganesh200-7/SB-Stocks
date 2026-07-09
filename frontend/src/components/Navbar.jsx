import { NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">📈 FinVault</h2>

      <div className="nav-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/stocks">Stocks</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
        <NavLink to="/profile">Profile</ NavLink>
        {user?.isAdmin && (
  <NavLink to="/admin">Admin</NavLink>
)}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}