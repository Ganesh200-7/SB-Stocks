import { Link } from "react-router-dom";
import "../css/Admin.css";

export default function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, transactions and stock analytics.</p>
      </div>

      <div className="admin-grid">
        <Link to="/admin/users" className="admin-card">
          <div className="admin-icon">👥</div>
          <h2>Users</h2>
          <p>View and manage all registered users.</p>
        </Link>

        <Link to="/admin/orders" className="admin-card">
          <div className="admin-icon">📄</div>
          <h2>Transactions</h2>
          <p>View all buy and sell transactions.</p>
        </Link>

        <Link to="/admin/stocks" className="admin-card">
          <div className="admin-icon">📈</div>
          <h2>Stock Analytics</h2>
          <p>Analyze stock performance.</p>
        </Link>
      </div>
    </div>
  );
}