import React from "react";
import "../App.css";

export default function Navbar({ role, onLogout }) {
  return (
    <div className="navbar">
      <h3>Climate Dashboard</h3>

      <div>
        <span style={{ marginRight: "15px" }}>
          Role: <b>{String(role).toUpperCase()}</b>
        </span>

        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
