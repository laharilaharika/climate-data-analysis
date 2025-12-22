import React, { useState } from "react";
import "../App.css";

export default function Login({ onLogin, goToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <h2>Climate Dashboard Login</h2>

      <input
        type="text"
        placeholder="Username / Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={onLogin}>Login</button>

      <p className="switch-text">
        New user? <span onClick={goToRegister}>Register here</span>
      </p>
    </div>
  );
}
