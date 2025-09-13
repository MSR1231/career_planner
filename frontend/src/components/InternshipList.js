import React, { useEffect, useState } from "react";
function InternshipList() {
  const [interns, setInterns] = useState([]);
  useEffect(() => { fetch("http://localhost:5000/api/internships").then(r => r.json()).then(setInterns); }, []);
  return (
    <div>
      <h3>Internship Opportunities</h3>
      <ul>
        {interns.map(i => (<li key={i.id}><b>{i.title}</b> at {i.company}, {i.location} - {i.duration}, Stipend: {i.stipend}</li>))}
      </ul>
    </div>
  );
}
export default InternshipList;