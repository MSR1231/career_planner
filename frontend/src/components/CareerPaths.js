import React from "react";
import careerData from "../data/career_paths_detailed.json";

const cardStyle = {
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
  transition: "transform 0.3s ease",
  backgroundColor: "white",
  padding: "1.5rem",
  cursor: "pointer"
};

export default function CareerPaths() {
  return (
    <div className="container">
      <h2 className="text-center mb-5">Explore Career Paths</h2>
      <div className="row">
        {careerData.map(({ id, name, description }) => (
          <div className="col-md-4 mb-4" key={id}>
            <div
              style={cardStyle}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-10px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h4 style={{ color: "#4338ca", fontWeight: "700" }}>{name}</h4>
              <p style={{ color: "#6b7280" }}>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
