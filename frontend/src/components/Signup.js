import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, username, password})
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Signup successful! You can login now.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch(e) {
      setError('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:320,margin:'auto'}}>
      <h3>Signup</h3>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
      <div>
        <input type="text" placeholder="Username" required value={username} onChange={e=>setUsername(e.target.value)} />
      </div>
      <div>
        <input type="email" placeholder="Email" required value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Password" required value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
