import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import "../css/AdminStockChart.css";

export default function AdminStockChart() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5001/api/admin/stocks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Analytics data:", res.data);
      setStocks(res.data || []);
    } catch (err) {
      console.error("Analytics error:", err);
      setError(err.response?.data?.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const colors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
    "#84cc16",
    "#f97316",
    "#14b8a6",
  ];

  return (
    <div className="analytics-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className="analytics-title">📈 Stock Analytics</h1>
        <button 
          onClick={fetchAnalytics}
          style={{
            padding: "10px 20px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold"
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div style={{ color: "#ef4444", padding: "15px", marginBottom: "20px", background: "#7f1d1d", borderRadius: "8px" }}>
          ❌ {error}
        </div>
      )}

      {loading ? (
        <div style={{ color: "#fff", padding: "40px", textAlign: "center" }}>
          ⏳ Loading analytics...
        </div>
      ) : stocks.length === 0 ? (
        <div style={{ color: "#94a3b8", padding: "40px", textAlign: "center" }}>
          📊 No analytics data available yet
        </div>
      ) : (
        <>
          <div className="chart-card">
           <ResponsiveContainer width="100%" height={500}>
  <BarChart
    data={stocks}
    margin={{
      top: 20,
      right: 30,
      left: 20,
      bottom: 100,
    }}
  >
    {/* Dark grid */}
    <CartesianGrid
      stroke="#334155"
      strokeDasharray="3 3"
      vertical={false}
    />

    {/* X Axis */}
    <XAxis
      dataKey="stockName"
      angle={-45}
      textAnchor="end"
      height={100}
      tick={{
        fill: "#cbd5e1",
        fontSize: 12,
      }}
      axisLine={{ stroke: "#475569" }}
      tickLine={{ stroke: "#475569" }}
    />

    {/* Y Axis */}
    <YAxis
      tick={{
        fill: "#cbd5e1",
        fontSize: 12,
      }}
      axisLine={{ stroke: "#475569" }}
      tickLine={{ stroke: "#475569" }}
    />

    {/* Tooltip */}
    <Tooltip
      contentStyle={{
        backgroundColor: "#0f172a",
        border: "1px solid #334155",
        borderRadius: "10px",
        color: "#fff",
      }}
      labelStyle={{
        color: "#fff",
      }}
    />

    {/* Bars */}
    <Bar
      dataKey="totalQuantity"
      radius={[8, 8, 0, 0]}
      animationDuration={1000}
    >
      {stocks.map((entry, index) => (
        <Cell
          key={index}
          fill={[
            "#3b82f6",
            "#22c55e",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#06b6d4",
            "#ec4899",
          ][index % 7]}
        />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>
          </div>

          <table className="analytics-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>BUY</th>
                <th>SELL</th>
                <th>Quantity</th>
                <th>Total Value</th>
              </tr>
            </thead>

            <tbody>
              {stocks.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.stockName}</td>
                  <td>{stock.buyCount}</td>
                  <td>{stock.sellCount}</td>
                  <td>{stock.totalQuantity}</td>
                  <td>₹{stock.totalValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}