import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import UploadCSV from "./components/UploadCSV";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("student"); // ALWAYS STRING

  if (!loggedIn) {
    if (page === "register") {
      return (
        <Register
          onRegister={(role) => {
            // FORCE role to be string
            setUserRole(String(role));
            setPage("login");
          }}
          goToLogin={() => setPage("login")}
        />
      );
    }

    return (
      <Login
        onLogin={() => setLoggedIn(true)}
        goToRegister={() => setPage("register")}
      />
    );
  }

  return (
    <>
      <Navbar
        role={String(userRole)}
        onLogout={() => {
          setLoggedIn(false);
          setPage("login");
        }}
      />
      <UploadCSV />
    </>
  );
}

export default App;
