import { useEffect, useState } from "react";
import API from "../api/axios";
import "../css/Portfolio.css";
export default function Portfolio() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await API.get("/portfolio");
         console.log("PORTFOLIO API:", res.data);
        setData(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load portfolio"
        );
      }
    };

    fetchPortfolio();

    const interval = setInterval(fetchPortfolio, 5000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
  <div className="portfolio-page error-page">
    {error}
  </div>
);
  }

  if (!data) {
    return (
  <div className="portfolio-page loading-page">
    Loading portfolio...
  </div>
);
  }

  const holdings = data.portfolio || [];
  const totalInvested = data.totalInvested ?? 0;
  const currentValue = data.currentValue ?? 0;
  const profitLoss = data.profitLoss ?? 0;
  const profitLossPercentage = data.profitLossPercentage ?? 0;

  const isProfit = profitLoss >= 0;

  const winners = holdings.filter((h) => {
    const stock = h.stockId || h.stock || {};
    return (stock.price || 0) > (h.averagePrice || 0);
  }).length;

  const losers = holdings.filter((h) => {
    const stock = h.stockId || h.stock || {};
    return (stock.price || 0) < (h.averagePrice || 0);
  }).length;

 return (
  <div className="portfolio-page">

    {/* HEADER */}
    <div className="portfolio-header">
      <h1>💼 Portfolio</h1>
      <p>Track your holdings and performance</p>
    </div>

    {/* SUMMARY */}
    <div className="summary-grid">

      <div className="summary-card invested">
  <p>Total Invested</p>
  <h2>
    ₹
    {Number(totalInvested).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </h2>
</div>

      <div className="summary-card current">
        <p>Current Value</p>
        <h2>₹{currentValue}</h2>
      </div>

      <div className="summary-card profit">
        <p>Profit / Loss</p>
        <h2>{profitLoss >= 0 ? "+" : "-"}₹
{Math.abs(profitLoss).toLocaleString("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}</h2>
      </div>

      <div className="summary-card returns">
        <p>Return %</p>
        <h2>{profitLossPercentage}%</h2>
      </div>

    </div>

    {/* STATS */}
    <div className="portfolio-stats">

      <div className="stats-grid">

        <div className="stat">
          <p>Holdings</p>
          <h3>{holdings.length}</h3>
        </div>

        <div className="stat">
          <p>Profits</p>
          <h3>{winners}</h3>
        </div>

        <div className="stat">
          <p>Losses</p>
          <h3>{losers}</h3>
        </div>

      </div>

    </div>

    {/* HEADER */}
    <div className="holdings-header">
      <h2>Your Holdings</h2>
      <div className="live-badge">Live</div>
    </div>

    {/* HOLDINGS */}
    <table className="holdings-table">
  <thead>
    <tr>
      <th>Stock</th>
      <th>Qty</th>
      <th>Avg Price</th>
      <th>Current</th>
      <th>Invested</th>
      <th>Value</th>
      <th>P/L</th>
    </tr>
  </thead>

  <tbody>
    {holdings.map((item) => {
      
      const stock = item.stockId || item.stock || {};
      const stockId = stock._id || item.stockId || item.stock;

      const quantity = item.quantity || 0;
      const avgPrice = item.averagePrice || 0;
      const currentPrice = stock.price || 0;

      const invested = quantity * avgPrice;
      const currentStockValue = quantity * currentPrice;
      const stockPL = currentStockValue - invested;
      const isStockProfit = stockPL >= 0;
console.log(item);
      return (
        <tr key={stockId}>
          <td>
            <strong>{stock.symbol}</strong>
            <br />
            <small>{stock.name}</small>
          </td>

          <td>{quantity}</td>

          <td>
            ₹{avgPrice.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </td>

          <td>
            ₹{currentPrice.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </td>

          <td>
            ₹{invested.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </td>

          <td>
            ₹{currentStockValue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </td>

          <td className={isStockProfit ? "stock-profit" : "stock-loss"}>
            {isStockProfit ? "+" : "-"}₹
            {Math.abs(stockPL).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

    {/* EMPTY STATE */}
    {holdings.length === 0 && (
      <div className="empty-holdings">
        <p>📊 No holdings yet. Start building your portfolio!</p>
      </div>
    )}

  </div>
);
}