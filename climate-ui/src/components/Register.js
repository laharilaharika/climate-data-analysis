import React, { useState, useEffect } from "react";
import "../App.css";
const EyeOpen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 5C7 5 3.27 8.11 2 12c1.27 3.89 5 7 10 7s8.73-3.11 10-7c-1.27-3.89-5-7-10-7z"
      stroke="black"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="2" />
  </svg>
);

const EyeClosed = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 12c1.27 3.89 5 7 10 7 2.08 0 4.03-.5 5.67-1.38"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M22 12c-1.27-3.89-5-7-10-7-2.08 0-4.03.5-5.67 1.38"
      stroke="black"
      strokeWidth="2"
    />
    <line
      x1="2"
      y1="2"
      x2="22"
      y2="22"
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);

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

  /* VALIDATION RULES */
  const validateName = (v) =>
    /^[A-Za-z\s]{3,}$/.test(v)
      ? ""
      : "Name must have at least 3 letters";

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
      ? ""
      : "Email must contain @ and domain like gmail.com";

  const validatePassword = (v) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,12}$/.test(v)
      ? ""
      : "Password must be 10–12 chars with A-Z, a-z, 0-9";

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

    const user = { name, email, password, role };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful! Please login.");
    onRegister(role);
  };

  return (
    <div className="signup-bg">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join Climate Analysis Platform</p>

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
>
  {showPassword ? <EyeOpen /> : <EyeClosed />}
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

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          disabled={!isValid}
          className={!isValid ? "btn-disabled" : ""}
        >
          Sign Up
        </button>

        {/* GOOGLE AT BOTTOM */}
        <div className="divider">OR</div>
        <button className="google-btn">Continue with Google</button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={goToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}
