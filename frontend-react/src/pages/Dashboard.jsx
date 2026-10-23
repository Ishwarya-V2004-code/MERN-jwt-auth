import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  // Old btn - Dashboard
  const handleDashboard = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/dashboard", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.text();
    console.log(result);
    setData(result);
  };

  // Old btn1 - Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("logout");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <button onClick={handleDashboard}>Dashboard</button>
      <br /><br />
      <button onClick={handleLogout}>logout</button>
      <br /><br />
      {data && <p>{data}</p>}
    </div>
  );
}

export default Dashboard;