
import React from "react";
import { useNavigate } from "react-router-dom";

function TenantDashboard() {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      {/* Welcome */}
      <h1>Welcome, {user?.name || "User"} 👋</h1>

      <p style={{ color: "#666" }}>
        Find your perfect home with HouseRent.
      </p>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* Search Properties */}
        <div
          style={{
            padding: "25px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🔍 Search Properties</h2>
          <p>Find houses available for rent.</p>

          <button onClick={() => navigate("/properties")}>
            Search Properties
          </button>
        </div>

        {/* Available Houses */}
        <div
          style={{
            padding: "25px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🏠 Available Houses</h2>
          <p>View houses available for rent.</p>

          <button onClick={() => navigate("/properties")}>
            View Houses
          </button>
        </div>

        {/* My Applications */}
        <div
          style={{
            padding: "25px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>📋 My Applications</h2>
          <p>Check your rental applications.</p>

          <button onClick={() => alert("Applications coming soon!")}>
            My Applications
          </button>
        </div>

        {/* Saved Properties */}
        <div
          style={{
            padding: "25px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>❤️ Saved Properties</h2>
          <p>View your saved houses.</p>

          <button onClick={() => alert("Saved properties coming soon!")}>
            Saved Properties
          </button>
        </div>
      </div>

      {/* Logout */}
      <div style={{ marginTop: "40px" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 25px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TenantDashboard;