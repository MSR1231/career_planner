import React, { useEffect, useState } from "react";
function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => { fetch("http://localhost:5000/api/scholarships").then(r => r.json()).then(setScholarships); }, []);
  return (
    <div>
      <h3>Scholarships</h3>
      <ul>
        {scholarships.map(s => (<li key={s.id}><b>{s.name}</b>: {s.eligibility}, Amount: {s.amount}, Deadline: {s.deadline}</li>))}
      </ul>
    </div>
  );
}
export default ScholarshipList;