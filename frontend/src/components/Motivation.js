import React, { useEffect, useState } from "react";
function Motivation() {
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/motivation")
      .then(res => res.json())
      .then(setMsgs);
  }, []);
  return (
    <div style={{margin: "16px 0"}}>
      <h3>Motivational Messages</h3>
      {msgs.map((msg, i) => (
        <div key={i} style={{background:'#e0f7fa',padding:10,margin:'5px 0',borderRadius:8}}>
          {msg}
        </div>
      ))}
    </div>
  );
}
export default Motivation;