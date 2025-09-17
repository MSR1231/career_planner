import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ onSignup }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    currentClass: "",
    age: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (Object.values(form).some((v) => !v)) {
      setError("Please fill all fields");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Signup failed");
      }

      const user = await res.json();
      onSignup(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2>Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="form-control mb-3"
        value={form.fullName}
        onChange={change}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-control mb-3"
        value={form.email}
        onChange={change}
      />
      <input
        type="text"
        name="currentClass"
        placeholder="Current Class"
        className="form-control mb-3"
        value={form.currentClass}
        onChange={change}
      />
      <input
        type="number"
        min="10"
        max="100"
        name="age"
        placeholder="Age"
        className="form-control mb-3"
        value={form.age}
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
      <button type="submit" className="btn btn-success w-100">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
