import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const getAdminData = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/admin`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json(); // your backend sends res.json(users)
    console.log(data);
    setUsers(data); // data is array of users
  }

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/admin/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    alert(data.message);
    getAdminData(); // refresh list
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Admin Panel</h1>
      <button onClick={getAdminData}>Admin Data</button><br /><br />
      <button onClick={logout}>logout</button>

      <div>
        {users.map((u) => (
          <div key={u._id} style={{ border: "1px solid black", margin: "10px", padding: "10px", color: "white" }}>
            <p>{u.name || u.username} - {u.email}</p>
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
}
export default Admin;