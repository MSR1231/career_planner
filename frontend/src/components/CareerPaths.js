import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import careerFlowcharts from '../data/CareerFlowcharts.json';

const CareerPaths = ({ userInterests }) => {
  const userStream = userInterests[1] || 'Science'; 
  const flowchartData = careerFlowcharts[userStream];
  
  if (!flowchartData) {
    return (
      <div className="container mt-5 pt-5 pb-5 text-center">
        <h2>Career Paths</h2>
        <p className="lead text-muted">
          No flowchart available for your chosen stream.
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5 pb-5">
      <div className="text-center mb-5">
        <h2>Career Flowchart for {userStream} Stream</h2>
        <p className="lead text-muted">
          A visual guide to possible career paths based on your interests.
        </p>
      </div>
      <div style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}>
        <ReactFlow
          nodes={flowchartData.nodes}
          edges={flowchartData.edges}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default CareerPaths;