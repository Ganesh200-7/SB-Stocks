import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "../css/StockChart.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockChart() {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);

  useEffect(() => {
    fetchStock();
  }, [symbol]);

  const fetchStock = async () => {
    try {
      const res = await API.get(`/stocks/symbol/${symbol}`);
      setStock(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!stock) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  const prices = stock.priceHistory || [];

  const chartData = prices.map((price, index) => ({
    day: index + 1,
    price,
  }));

  const high = prices.length
    ? Math.max(...prices)
    : stock.price;

  const low = prices.length
    ? Math.min(...prices)
    : stock.price;

  const open = prices.length
    ? prices[0]
    : stock.price;

  const close = prices.length
    ? prices[prices.length - 1]
    : stock.price;

  return (
    <div className="stock-chart-container">

      {/* Header */}
      <div className="stock-header">
        <div>
          <h1>{stock.name}</h1>
          <p>{stock.symbol}</p>
        </div>

        <div className="stock-price">
          ₹{stock.price}
        </div>
      </div>

      {/* Chart */}
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              stroke="#334155"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              domain={[
                Math.floor(low - 10),
                Math.ceil(high + 10),
              ]}
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{
                r: 4,
                fill: "#22c55e",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="stock-info">

        <div className="info-card">
          <h3>High</h3>
          <p>₹{high}</p>
        </div>

        <div className="info-card">
          <h3>Low</h3>
          <p>₹{low}</p>
        </div>

        <div className="info-card">
          <h3>Open</h3>
          <p>₹{open}</p>
        </div>

        <div className="info-card">
          <h3>Close</h3>
          <p>₹{close}</p>
        </div>

      </div>
    </div>
  );
}