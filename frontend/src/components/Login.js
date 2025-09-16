import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Fill all fields');
    try {
      const res = await fetch('/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const user = await res.json();
      onLogin(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="container mt-5" style={{maxWidth: '400px'}}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <input type="email" placeholder="Email" className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="form-control mb-3" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
}

export default Login;
