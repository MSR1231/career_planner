import React from 'react';

function StudyMaterials({ materials }) {
  if (!materials || materials.length === 0) {
    return <div className="container py-5"><p>No study materials available.</p></div>;
  }

  return (
    <div className="container py-5">
      <h2>Study Materials</h2>
      <div className="row">
        {materials.map(mat => (
          <div key={mat.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{mat.title}</h5>
                <p>{mat.description}</p>
                <a href={mat.url} target="_blank" rel="noreferrer" className="btn btn-outline-primary">View Material</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyMaterials;
