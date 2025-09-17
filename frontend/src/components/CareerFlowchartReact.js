import React, { useState } from "react";

const flowchartData = {
  "Science & Technology": [
    {
      degree: "MBBS",
      careers: [
        { name: "Doctor", link: "https://en.wikipedia.org/wiki/Physician" },
        { name: "Surgeon", link: "https://en.wikipedia.org/wiki/Surgeon" },
      ],
    },
    {
      degree: "BDS",
      careers: [{ name: "Dentist", link: "https://en.wikipedia.org/wiki/Dentistry" }],
    },
    {
      degree: "BAMS",
      careers: [{ name: "Ayurvedic Doctor", link: "https://en.wikipedia.org/wiki/Ayurveda" }],
    },
    {
      degree: "BSc Nursing",
      careers: [{ name: "Nurse", link: "https://en.wikipedia.org/wiki/Nursing" }],
    },
    {
      degree: "BPharm",
      careers: [{ name: "Pharmacist", link: "https://en.wikipedia.org/wiki/Pharmacist" }],
    },
    {
      degree: "BTech",
      careers: [
        { name: "Software Engineer", link: "https://en.wikipedia.org/wiki/Software_engineer" },
        { name: "Civil Engineer", link: "https://en.wikipedia.org/wiki/Civil_engineering" },
      ],
    },
    {
      degree: "BSc CS",
      careers: [{ name: "Data Analyst", link: "https://en.wikipedia.org/wiki/Data_analysis" }],
    },
    {
      degree: "BArch",
      careers: [{ name: "Architect", link: "https://en.wikipedia.org/wiki/Architectural_profession" }],
    },
  ],

  // Add other categories similarly
  "Vocational & Practical": [
    {
      degree: "Diploma/Vocational",
      careers: [{ name: "Technician", link: "https://en.wikipedia.org/wiki/Technician" }],
    },
    {
      degree: "IT Certification",
      careers: [{ name: "Software Developer", link: "https://en.wikipedia.org/wiki/Software_developer" }],
    },
    {
      degree: "Hospitality",
      careers: [{ name: "Hotel Manager", link: "https://en.wikipedia.org/wiki/Hotel_manager" }],
    },
    {
      degree: "Trade/Craft",
      careers: [{ name: "Artisan", link: "https://en.wikipedia.org/wiki/Artisan" }],
    },
  ],
};

const colors = [
  "#4A90E2",
  "#F5A623",
  "#50E3C2",
  "#B8E986",
  "#F8E71C",
  "#D0021B",
  "#9013FE",
];

export default function CareerFlowchartReact() {
  const categories = Object.keys(flowchartData);
  const [category, setCategory] = useState(categories[0]);

  return (
    <div className="container my-4">
      <h2>Career Paths Flowchart</h2>

      <select
        className="form-select my-3"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {flowchartData[category].map((item, idx) => (
          <div
            key={item.degree}
            style={{
              padding: "1rem",
              borderRadius: "10px",
              border: `2px solid ${colors[idx % colors.length]}`,
              backgroundColor: colors[idx % colors.length] + "22",
              flex: "1 1 300px",
              minWidth: "280px",
            }}
          >
            <h4 style={{ color: colors[idx % colors.length], marginBottom: "0.75rem" }}>
              {item.degree}
            </h4>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {item.careers.map((career) => (
                <li key={career.name} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={career.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: colors[idx % colors.length],
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={e => (e.target.style.color = "#000")}
                    onMouseLeave={e => (e.target.style.color = colors[idx % colors.length])}
                  >
                    {career.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
