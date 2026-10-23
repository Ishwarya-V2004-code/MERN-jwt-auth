import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>JWT Authentication</h1>
      <div className="container">
        <div className="form-box">
          <h2>Welcome</h2>
          <p style={{ textAlign: "center", marginBottom: "15px", color: "#666" }}>
            Role Based Auth System
          </p>

          <button onClick={() => navigate("/signup")}>Signup</button>
          <br /><br />

          <button onClick={() => navigate("/login")}>Login</button>
          <br /><br />

          <button onClick={() => navigate("/profile")}>Profile</button>
          <br /><br />

          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <br /><br />

          <button onClick={() => navigate("/admin")}>Admin</button>
        </div>
      </div>
    </div>
  );
}

export default Home;