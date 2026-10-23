import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const getAdminData = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/admin", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const text = await res.text();
    setResult(text);
    alert(text);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Admin Panel</h1>
      <button onClick={getAdminData}>Admin Data</button><br /><br />
      <button onClick={logout}>logout</button>
      <p>{result}</p>
    </div>
  );
}
export default Admin;