import { useNavigate } from "react-router-dom";
import "../css/Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* NAV */}
      <div className="nav">
        <h2 className="logo">FinVault</h2>

        <button className="nav-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>

      {/* HERO */}
      <div className="hero">
        <h1 className="title">
          Smart Stock Tracking <br /> Made Simple 🚀
        </h1>

        <p className="subtitle">
          Manage your portfolio, track live stocks, and grow your investment skills.
        </p>

        <div className="cta">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Get Started
          </button>

          <button className="btn-secondary">
            Learn More
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <div className="card">
          <h3>📈 Live Tracking</h3>
          <p>Real-time stock updates.</p>
        </div>

        <div className="card">
          <h3>💼 Portfolio</h3>
          <p>Manage investments easily.</p>
        </div>

        <div className="card">
          <h3>🔒 Secure</h3>
          <p>JWT authentication protected.</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p>© 2026 SkillWallet</p>
      </div>

    </div>
  );
};

export default Landing;