import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
  "https://renthousehub.rf.gd/api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (data.success) {
        // Save logged-in user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // OWNER
        if (data.user.role === "owner") {
          navigate("/dashboard/owner");
        }

        // ALL OTHER USERS
        else {
          navigate("/dashboard/tenant");
        }

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to server");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        background: "#f7f9fc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>
          Welcome Back
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Login to your HouseRent account
        </p>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div style={{ marginBottom: "18px" }}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "7px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "7px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#666",
          }}
        >
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
