import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Your old btn - Get Profile
  const handleProfile = async () => {
    const token = localStorage.getItem("token");
    const API_URL=process.env.REACT_APP_API_URL

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const result = await response.text();
      console.log(result);
      setMessage(result);
      alert(result);
    } catch (err) {
      console.log(err);
      alert("Failed to get profile");
    }
  };

  // Your old btn1 - Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("logout");
    alert("Logged out");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Profile</h1>
      
      <button onClick={handleProfile}>profile</button>
      <br/><br/>
      
      <button onClick={handleLogout}>logout</button>
      
      <br/><br/>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;