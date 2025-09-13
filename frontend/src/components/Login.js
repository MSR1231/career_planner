import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch(e) {
      setError('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:320,margin:'auto'}}>
      <h3>Login</h3>
      {error && <div style={{color:'red'}}>{error}</div>}
      <div>
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
