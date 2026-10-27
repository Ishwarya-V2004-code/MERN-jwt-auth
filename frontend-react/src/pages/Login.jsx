import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/login";
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (data.token) {
        // Save token
        localStorage.setItem("token", data.token);
        alert("token stored successfully");

        // Decode JWT to get role (your old logic)
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        console.log(payload);
        const role = payload.role || data.role;

        // Role based redirect - your old logic
        if (role === "admin") {
          navigate("/admin"); // was: admin.html
        } else {
          navigate("/profile"); // was: profile.html
        }
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;