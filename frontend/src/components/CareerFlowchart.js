import React, { useState } from "react";
import Mermaid from "react-mermaid2";
import { flowcharts } from "../data/flowcharts";

function CareerFlowchart() {
  const categories = Object.keys(flowcharts);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="container my-4">
      <h2>Career Paths Flowchart</h2>
      <select
        className="form-select mb-4"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="border p-3">
        <Mermaid chart={flowcharts[selectedCategory]} />
      </div>
    </div>
  );
}

export default CareerFlowchart;
