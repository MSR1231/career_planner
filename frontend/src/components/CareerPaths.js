import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import careerFlowcharts from '../data/CareerFlowcharts.json';

const CareerPaths = ({ userInterests }) => {
  const userStream = userInterests?.[1] || 'Science';

  const flowchartData = careerFlowcharts[userStream];

  if (!flowchartData) {
    return <div className="container py-5"><p>Career flowchart data not available for your stream.</p></div>;
  }

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ReactFlow nodes={flowchartData.nodes} edges={flowchartData.edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CareerPaths;
