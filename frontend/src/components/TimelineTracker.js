import React, { useEffect, useState } from "react";
function TimelineTracker() {
  const [timeline, setTimeline] = useState([]);
  useEffect(() => { fetch("http://localhost:5000/api/timeline").then(r => r.json()).then(setTimeline); }, []);
  return (
    <div>
      <h3>Important Dates</h3>
      <ul>
        {timeline.map((t, i) => (<li key={i}>{t.event} — {t.date}</li>))}
      </ul>
    </div>
  );
}
export default TimelineTracker;