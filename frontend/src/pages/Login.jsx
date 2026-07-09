import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await API.post("/auth/login", { email, password });

    // 🔥 SAVE TOKEN (fresh every login)
    localStorage.setItem("token", res.data.token);

    // 🔥 IMPORTANT: fetch correct user from DB
    const userRes = await API.get("/auth/me");
console.log(userRes.data);
    // 🔥 store logged-in user in app state
    setUser(userRes.data);
    localStorage.setItem("user", JSON.stringify(userRes.data));

    setMessage("Login successful 🚀");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);

  } catch (err) {
    const serverMessage = err.response?.data?.message;

    setMessage(serverMessage || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <h2>Welcome Back 👋</h2>
          <p>Login to continue trading</p>
        </div>

        {message && (
          <div
            className={
              message.toLowerCase().includes("successful")
                ? "message success"
                : "message error"
            }
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? <div className="loader"></div> : "Login"}
          </button>

        </form>

        <p className="footer-text">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>

    </div>
  );
}