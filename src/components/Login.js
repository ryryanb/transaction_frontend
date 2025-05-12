import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState(0);  // Default to tenant_id 0
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post(
        "http://https://saas-auth-system.vercel.app/login",
        {
          email,
          password,
          tenant_id: tenantId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store the JWT in localStorage
      localStorage.setItem("jwt_token", response.data.access_token);  // Assuming the JWT is in `response.data.token`

      // Redirect to the dashboard (or any other page)
      navigate('/dashboard');  // Navigating after login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tenant_id">Tenant ID</label>
          <input
            type="number"
            id="tenant_id"
            value={tenantId}
            onChange={(e) => setTenantId(Number(e.target.value))}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
