import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
function CollegeList({ setSelectedCollege }) {
  const [colleges, setColleges] = useState([]);
  useEffect(() => { fetch("http://localhost:5000/api/colleges").then(res => res.json()).then(setColleges); }, []);
  return (
    <div>
      <h3>Nearby Colleges</h3>
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {colleges.map(col => (
          <div key={col.id} style={{width:340,margin:12,background:'#fff',borderRadius:10,boxShadow:'0 2px 5px #aaa',overflow:'hidden'}}>
            <img src={col.image} alt={col.name} style={{width:'100%',height:140,objectFit:'cover'}}/>
            <div style={{padding:16}}>
              <h4>{col.name}</h4>
              <p>{col.location}</p>
              <p>Fees (General): ₹{col.fees.General} | OBC: ₹{col.fees.OBC} | SC: ₹{col.fees.SC}</p>
              <p>Cutoff: Gen {col.cutoff.General}% | OBC {col.cutoff.OBC}% | SC {col.cutoff.SC}%</p>
              <Link to={`/colleges/${col.id}`} onClick={() => setSelectedCollege(col)}>Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CollegeList;