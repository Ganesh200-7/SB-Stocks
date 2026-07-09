import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import "../css/StockChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart() {
  const { symbol } = useParams();

  const [stock, setStock] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await API.get(`/stocks/symbol/${symbol}`);
        setStock(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStock();
  }, [symbol]);

  if (!stock) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  const chartData = {
  labels: stock.priceHistory.map((_, index) => index + 1),

  datasets: [
    {
      label: "Stock Growth",
      data: stock.priceHistory,

      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.2)",

      borderWidth: 4,
      tension: 0.4,

      fill: true,

      pointBackgroundColor: "#3b82f6",
      pointBorderColor: "#ffffff",
      pointRadius: 4,
      pointHoverRadius: 7,
    },
  ],
};

 const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      labels: {
        color: "#fff",
      },
    },

    title: {
      display: true,
      text: "Stock Growth",
      color: "#fff",
      font: {
        size: 18,
      },
    },
  },

  scales: {
    x: {
      ticks: {
        color: "#94a3b8",
      },

      grid: {
        color: "#1e293b",
      },
    },

    y: {
      ticks: {
        color: "#94a3b8",
      },

      grid: {
        color: "#1e293b",
      },
    },
  },
};

  return (
  <div className="stock-chart-container">

    <div className="stock-header">
      <div>
        <h1>{stock.name}</h1>
        <p>{stock.symbol}</p>
      </div>

      <div className="stock-price">
        ₹{stock.price}
      </div>
    </div>

    <div className="chart-box">
      <Line
        data={chartData}
        options={options}
      />
    </div>

    <div className="stock-info">

      <div className="info-card">
        <h3>High</h3>
        <p>
          ₹{Math.max(...stock.priceHistory)}
        </p>
      </div>

      <div className="info-card">
        <h3>Low</h3>
        <p>
          ₹{Math.min(...stock.priceHistory)}
        </p>
      </div>

      <div className="info-card">
        <h3>Open</h3>
        <p>
          ₹{stock.priceHistory[0]}
        </p>
      </div>

      <div className="info-card">
        <h3>Close</h3>
        <p>
          ₹{
            stock.priceHistory[
              stock.priceHistory.length - 1
            ]
          }
        </p>
      </div>

    </div>

  </div>
);
}