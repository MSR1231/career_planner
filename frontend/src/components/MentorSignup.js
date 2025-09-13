import React, { useState } from "react";
function MentorSignup() {
  const [name, setName] = useState(""); const [college, setCollege] = useState(""); const [expertise, setExpertise] = useState(""); const [contact, setContact] = useState(""); const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, college, expertise, contact };
    const res = await fetch("http://localhost:5000/api/mentorsignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.success) { setMsg("Mentor signup successful!"); setName(""); setCollege(""); setExpertise(""); setContact(""); } else { setMsg("Signup failed. Try again."); }
  };
  return (
    <div style={{background:"#fff",margin:"18px auto",maxWidth:420,padding:"22px",borderRadius:"10px",boxShadow:"0 2px 8px #bbb"}}>
      <h3>Mentor Signup</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="College" value={college} onChange={e => setCollege(e.target.value)} required />
        <input type="text" placeholder="Expertise (e.g. UPSC, IT, Business)" value={expertise} onChange={e => setExpertise(e.target.value)} required />
        <input type="email" placeholder="Contact Email" value={contact} onChange={e => setContact(e.target.value)} required />
        <button type="submit" style={{background:"#1976d2",color:"#fff",border:"none",borderRadius:4,padding:8,marginTop:8}}>Sign Up</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
export default MentorSignup;