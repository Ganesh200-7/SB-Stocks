import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../css/Dashboard.css";
import "../css/DashboardStocks.css";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  const fetchStocks = async () => {
    try {
      
      const res = await API.get("/stocks");

      

      setStocks(res.data);
    } catch (err) {
      console.log("Stock Error:", err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchProfile();
    fetchStocks();
  }, []);

  

  return (
      <>
      <Navbar />
    <div className="dashboard">

      <div className="header">
        <h1>📊 Trading Dashboard</h1>
        <p>Welcome back, {user?.name || "Trader"}</p>
      </div>

      <div className="user-card">
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>

      <div className="stats-grid">

        <div className="stat-box">
          <p className="label">Market Status</p>
          <p className="live">● Live</p>
        </div>

        <div className="stat-box">
          <p className="label">Platform</p>
          <p>Paper Trading / Live Ready</p>
        </div>

        <div className="stat-box">
          <p className="label">Mode</p>
          <p className="mode">Trading Terminal</p>
        </div>

      </div>
<div className="top-stocks">

  <h2>📈 Top Stocks</h2>

  {stocks.map((stock) => (

    <div key={stock._id} className="stock-item">

      <div>

        <h3>
          {stock.name} ({stock.symbol})
        </h3>

        <p>${stock.price}</p>

      </div>

      <button
        onClick={() =>
          navigate(`/stock-chart/${stock.symbol}`)
        }
      >
        View Chart
      </button>

    </div>

  ))}

</div>
    </div>
      </>
  );
}