import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../css/Watchlist.css";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchWatchlist = async () => {
    try {
      setLoading(true);

      const res = await API.get("/watchlist");

      setWatchlist(res.data || []);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load watchlist"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (stockId) => {
    try {
      await API.delete(`/watchlist/${stockId}`);
      fetchWatchlist();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to remove stock"
      );
    }
  };

  return (
    <div className="watchlist-page">

      {/* Header */}
      <div className="watchlist-header">

        <div>
          <h1>Watchlist</h1>
          <p>Monitor your favorite stocks</p>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="loading-box">
          Loading watchlist...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        watchlist.length === 0 && (
          <div className="empty-box">
            <h2>No Stocks Added</h2>
            <p>
              Add stocks to your watchlist to
              monitor them.
            </p>
          </div>
        )}

      {/* Table */}
      {!loading &&
        !error &&
        watchlist.length > 0 && (

          <div className="table-container">

            <table className="watchlist-table">

              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th className="center">Price</th>
                  <th className="center">Status</th>
                  <th className="center">Action</th>
                </tr>
              </thead>

              <tbody>

                {watchlist.map((stock) => (

                  <tr key={stock._id}>

                    <td className="symbol">
                      {stock.symbol}
                    </td>

                    <td>
                      {stock.name}
                    </td>

                    <td className="center">
                      ₹{stock.price}
                    </td>

                    <td className="center">
                      <span className="status">
                        Watching
                      </span>
                    </td>

                    <td className="center">
                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeFromWatchlist(
                            stock._id
                          )
                        }
                      >
                        Remove
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

    </div>
  );
}