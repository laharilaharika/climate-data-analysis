import React, { useState, useEffect } from "react";
import "../App.css";

export default function Register({ onRegister, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // validation helpers
  const validateName = (v) =>
    /^[A-Za-z\s]{3,}$/.test(v)
      ? ""
      : "Name must be at least 3 letters";

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? ""
      : "Enter a valid email";

  const validatePassword = (v) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v)
      ? ""
      : "8+ chars with uppercase, lowercase & number";

  // validate only after typing
  useEffect(() => {
    const newErrors = {
      name: touched.name ? validateName(name) : "",
      email: touched.email ? validateEmail(email) : "",
      password: touched.password ? validatePassword(password) : "",
    };

    setErrors(newErrors);

    setIsValid(
      name &&
        email &&
        password &&
        !newErrors.name &&
        !newErrors.email &&
        !newErrors.password
    );
  }, [name, email, password, touched]);

  const handleRegister = () => {
    if (!isValid) return;
    alert("Registration successful!");
    onRegister(role);
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {/* GOOGLE BUTTON */}
      
      <div className="divider">OR</div>
      <button className="google-btn">
        Continue with Google
      </button>

      {/* NAME */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => setTouched({ ...touched, name: true })}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched({ ...touched, email: true })}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      {/* PASSWORD */}
      <div className="password-box">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched({ ...touched, password: true })}
        />
        <span
  className="eye"
  onClick={() => setShowPassword(!showPassword)}
  title={showPassword ? "Hide password" : "Show password"}
>
  {showPassword ? "Hide" : "Show"}
</span>

      </div>
      {errors.password && <p className="error">{errors.password}</p>}

      {/* ROLE */}
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="scientist">Scientist</option>
        <option value="researcher">Researcher</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleRegister}
        disabled={!isValid}
        className={!isValid ? "btn-disabled" : ""}
      >
        Register
      </button>

      <p className="switch-text">
        Already have an account?{" "}
        <span onClick={goToLogin}>Login</span>
      </p>
    </div>
  );
}
