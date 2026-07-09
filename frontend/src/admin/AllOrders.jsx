import { useEffect, useState } from "react";
import axios from "axios";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5001/api/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2>All Orders</h2>

      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <p>
              <strong>User:</strong> {order.userName}
            </p>

            <p>
              <strong>Stock:</strong> {order.stockName}
            </p>

            <p>
              <strong>Type:</strong> {order.type}
            </p>

            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>

            <p>
              <strong>Price:</strong> ₹{order.price}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#1e293b",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #334155",
  },
};