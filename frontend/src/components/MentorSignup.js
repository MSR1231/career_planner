import React, { useState } from 'react';

function MentorSignup() {
  const [form, setForm] = useState({ name: '', email: '', field: '', location: '', contact: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Normally send to backend here; for now just show success message.
    setMessage('Thanks for signing up as a mentor! We will get back to you soon.');
  };

  return (
    <div className="container py-5" style={{ maxWidth: '500px' }}>
      <h2>Mentor Signup</h2>
      {message ? <div className="alert alert-success">{message}</div> : (
        <form onSubmit={handleSubmit}>
          <input name="name" className="form-control mb-3" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" className="form-control mb-3" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="field" className="form-control mb-3" placeholder="Field of Expertise" value={form.field} onChange={handleChange} required />
          <input name="location" className="form-control mb-3" placeholder="Location (City, Region)" value={form.location} onChange={handleChange} />
          <input name="contact" className="form-control mb-3" placeholder="Contact Info (optional)" value={form.contact} onChange={handleChange} />
          <button type="submit" className="btn btn-primary w-100">Sign Up as Mentor</button>
        </form>
      )}
    </div>
  );
}

export default MentorSignup;
