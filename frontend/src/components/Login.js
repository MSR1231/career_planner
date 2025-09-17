import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      const user = await res.json();
      onLogin(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-control mb-3"
        value={form.email}
        onChange={change}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-control mb-3"
        value={form.password}
        onChange={change}
      />
      <button type="submit" className="btn btn-primary w-100">
        Log In
      </button>
    </form>
  );
}

export default Login;
