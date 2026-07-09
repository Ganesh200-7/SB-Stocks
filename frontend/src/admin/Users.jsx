import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(res.data);
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // ✅ DELETE FUNCTION (ADD THIS)
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5001/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ remove from UI instantly
      setUsers(users.filter((user) => user._id !== id));

    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2>All Users</h2>

      {users.map((user) => (
        <div key={user._id} style={styles.card}>
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
          </div>

          <button
            style={styles.deleteBtn}
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    background: "#212237",
    borderRadius: "8px",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};