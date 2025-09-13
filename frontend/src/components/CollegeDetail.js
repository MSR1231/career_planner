import React from "react";
function CollegeDetail({ college }) {
  if (!college) return <div>Select a college to view details.</div>;
  return (
    <div className="college-detail-card" style={{background:"#fff",borderRadius:12,boxShadow:"0 2px 8px #bbb",padding:28,maxWidth:500,margin:"20px auto"}}>
      <img src={college.image} alt={college.name} style={{width:"100%",height:220,objectFit:"cover",borderRadius:"8px"}}/>
      <h2>{college.name}</h2>
      <p><b>Location:</b> {college.location}</p>
      <p><b>Infrastructure:</b> {college.infrastructure}</p>
      <p><b>Hostel:</b> {college.hostel}</p>
      <p><b>Fees:</b><br/>
        General: ₹{college.fees.General}<br/>
        OBC: ₹{college.fees.OBC}<br/>
        SC: ₹{college.fees.SC}
      </p>
      <p><b>Cutoff (%):</b><br/>
        General: {college.cutoff.General}%<br/>
        OBC: {college.cutoff.OBC}%<br/>
        SC: {college.cutoff.SC}%
      </p>
      <a href={college.website} target="_blank" rel="noopener noreferrer"><button style={{background:"#1976d2",color:"#fff",border:"none",borderRadius:"6px",padding:"10px 18px",marginTop:"14px",cursor:"pointer"}}>Visit College Website</button></a>
    </div>
  );
}
export default CollegeDetail;