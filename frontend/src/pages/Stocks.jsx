import { useEffect, useState } from "react";
import API from "../api/axios";
import "../css/Stocks.css";

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await API.get("/stocks");
      setStocks(res.data || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const buyStock = async (stockId) => {
    try {
      const quantity = Number(quantities[stockId] || 1);

      const res = await API.post("/trade/buy", {
        stockId,
        quantity,
      });

      alert(res.data.message);
      fetchStocks();
    } catch (err) {
      alert(err.response?.data?.message || "Buy failed");
    }
  };

  const sellStock = async (stockId) => {
    try {
      const quantity = Number(quantities[stockId] || 1);

      const res = await API.post("/trade/sell", {
        stockId,
        quantity,
      });

      alert(res.data.message);
      fetchStocks();
    } catch (err) {
      alert(err.response?.data?.message || "Sell failed");
    }
  };

  const addToWatchlist = async (stockId) => {
    try {
      const res = await API.post("/watchlist", { stockId });
      alert(res.data.message || "Added to watchlist");
    } catch (err) {
      alert(err.response?.data?.message || "Could not add to watchlist");
    }
  };

  const filteredStocks = [...stocks]
    .filter((stock) => {
      const name = stock?.name || "";
      const symbol = stock?.symbol || "";

      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        symbol.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return (a?.name || "").localeCompare(b?.name || "");
      }

      if (sortBy === "priceLow") {
        return (a?.price || 0) - (b?.price || 0);
      }

      if (sortBy === "priceHigh") {
        return (b?.price || 0) - (a?.price || 0);
      }

      return 0;
    });

  return (
    <div className="stocks-page">
      <h1 className="stocks-title">📈 Stocks Market</h1>

      {/* Search + Sort */}
      <div className="search-filter-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search company or symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="priceLow">Price (Low → High)</option>
          <option value="priceHigh">Price (High → Low)</option>
        </select>
      </div>

      {/* Stocks Grid */}
      <div className="stocks-grid">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock) => (
            <div key={stock._id} className="stock-card">
              <div className="stock-info">
                <h2>{stock.symbol}</h2>

                <p className="stock-name">
                  {stock.name || "Unknown"}
                </p>

                <p className="stock-price">
                  ₹ {(stock.price || 0).toFixed(2)}
                </p>
              </div>

              <input
                type="number"
                min="1"
                className="quantity-input"
                value={quantities[stock._id] || 1}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [stock._id]: Number(e.target.value),
                  })
                }
              />

              <div className="stock-actions">
                <button
                  className="buy-btn"
                  onClick={() => buyStock(stock._id)}
                >
                  Buy
                </button>

                <button
                  className="sell-btn"
                  onClick={() => sellStock(stock._id)}
                >
                  Sell
                </button>

                <button
                  className="watch-btn"
                  onClick={() => addToWatchlist(stock._id)}
                >
                  Watch
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="no-results">No stocks found.</h2>
        )}
      </div>
    </div>
  );
}