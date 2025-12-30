import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "./Login.css"; 

function Login() {
  const [form, setForm] = useState({ emp_name: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.emp_name.trim()) {
      setError("Employee Name is required");
      return;
    }

    try {
      const res = await api.get("/employees/"); 
      const employee = res.data.find(
        (emp) => emp.emp_name.toLowerCase() === form.emp_name.toLowerCase()
      );

      if (employee) {
        // Employee exists, login successful
        localStorage.setItem("employee", JSON.stringify(employee)); // Store logged-in employee
        navigate("/employees"); // Redirect to employee list
      } else {
        setError("Employee not found");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Server error, try again later");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Employee Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Employee Name</label>
            <input
              type="text"
              name="emp_name"
              placeholder="Enter your name"
              value={form.emp_name}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
