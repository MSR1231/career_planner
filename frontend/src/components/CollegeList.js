import React, { useState } from 'react';

function CollegeList({ colleges, userInterests, userLocation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(userLocation || '');
  const [selectedType, setSelectedType] = useState('');

  const typeMap = {
    Science: ["University", "Science College", "Engineering College", "Medical College", "Agricultural University"],
    Commerce: ["University", "General College", "Commerce & Science College", "Management College"],
    Arts: ["University", "General College", "Arts College"],
    Vocational: ["Polytechnic"]
  };

  const matchesInterests = (college) => {
    if (!userInterests || !userInterests[1]) return true;
    return typeMap[userInterests[1]]?.includes(college.type);
  };

  const filtered = colleges.filter(c => {
    const matchNameLoc = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLoc = selectedLocation ? c.location === selectedLocation : true;
    const matchType = selectedType ? c.type === selectedType : true;
    return matchNameLoc && matchLoc && matchType && matchesInterests(c);
  });

  const uniqueLocations = [...new Set(colleges.map(c => c.location))];
  const uniqueTypes = [...new Set(colleges.map(c => c.type))];

  return (
    <div className="container py-5">
      <h2>College Finder</h2>
      <div className="row mb-3 g-2">
        <input className="form-control col-md-4" type="search" placeholder="Search by name or location" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <select className="form-select col-md-3" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
          <option value="">All Locations</option>
          {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select className="form-select col-md-3" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
          <option value="">All Types</option>
          {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <div>
        {filtered.length === 0 ? (
          <p>No colleges found matching your criteria.</p>
        ) : (
          filtered.map(college => (
            <div key={college.id} className="card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title">{college.name}</h5>
                <p><strong>Location:</strong> {college.location}</p>
                <p><strong>Type:</strong> {college.type}</p>
                <p><strong>Affiliation:</strong> {college.affiliation}</p>
                <p><strong>Fees:</strong> {college.fees}</p>
                <p><strong>Cutoff:</strong> {college.cutoff}</p>
                <p><strong>Website:</strong> <a href={college.website} target="_blank" rel="noopener noreferrer">{college.website}</a></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CollegeList;
