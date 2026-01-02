import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import UploadCSV from "./components/UploadCSV";
import "./App.css";

function App() {
  // 👇 START WITH REGISTER PAGE
  const [page, setPage] = useState("register");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("student");

  // 🔹 NOT LOGGED IN
  if (!loggedIn) {
    if (page === "register") {
      return (
        <Register
          onRegister={(role) => {
            setUserRole(String(role));
            setPage("login"); // after signup → login
          }}
          goToLogin={() => setPage("login")}
        />
      );
    }

    // 🔹 LOGIN PAGE
    return (
      <Login
        onLogin={() => setLoggedIn(true)}
        goToRegister={() => setPage("register")}
      />
    );
  }

  // 🔹 DASHBOARD
  return (
    <>
      <Navbar
        role={String(userRole)}
        onLogout={() => {
          setLoggedIn(false);
          setPage("register"); // logout → signup
        }}
      />
      <UploadCSV />
    </>
  );
}

export default App;
