import { useEffect, useState } from "react";
import "../css/Transactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setTransactions([]);
    setError("");
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5001/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to load transactions");
      }

      setTransactions(Array.isArray(data) ? data : []);
      setError("");

    } catch (err) {
      console.log(err.message);
      setError(err.message || "Unable to load transactions");
    }
  };

  return (
    <div className="transactions-page">

      {/* Header */}
      <div className="transactions-header">
        <h1>Transactions</h1>
        <p>View your trading activity</p>
      </div>

      {/* Error */}
      {error ? (
        <div className="error-box">
          <p>{error}</p>
        </div>
      ) : transactions.length === 0 ? (

        /* Empty State */
        <div className="empty-box">
          <h2>No Transactions</h2>
          <p>Your buy and sell orders will appear here.</p>
        </div>

      ) : (

        /* Transactions Table */
        <div className="table-container">

          <table className="transactions-table">

            <thead>
              <tr>
                <th>Type</th>
                <th>Stock</th>
                <th className="center">Quantity</th>
                <th className="center">Price</th>
                <th className="center">Total</th>
              </tr>
            </thead>

            <tbody>

              {transactions.map((tx) => {
                console.log(tx);

                const stockInfo = tx.stockId;

                const stockName =
                  tx.stockName ||
                  stockInfo?.name ||
                  "";

                const stockSymbol =
                  tx.stockSymbol ||
                  stockInfo?.symbol ||
                  "";

                const stockLabel =
                  stockName ||
                  stockSymbol ||
                  "Deleted Stock";

                const stockDisplay =
                  stockName && stockSymbol
                    ? `${stockName} (${stockSymbol})`
                    : stockLabel;

                return (
                  <tr key={tx._id}>

                    <td>
                      <span
                        className={`badge ${
                          tx.type === "BUY"
                            ? "buy"
                            : "sell"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>

                    <td className="stock-name">
                      {stockDisplay}
                    </td>

                    <td className="center">
                      {tx.quantity}
                    </td>

                    <td className="center">
                      ₹{tx.price}
                    </td>

                    <td className="center total">
                      ₹{tx.total}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}