import React, { useState, useMemo } from 'react';

export default function SearchBar({ data = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }, [searchTerm, data]); // Only re-compute on changes to searchTerm or data
  
  console.log(searchTerm); // Check what the current search term is
  console.log(data); // Verify the structure and content of the data prop
  console.log(filteredData); // See what the filtered results are


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="input-group">
        <div className="form-outline">
          <input
            type="search"
            name="searchBar"
            id="searchBar"
            className="form-control"
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </div>
        <button type="button" className="btn btn-primary">Search</button>
      </div>
      <ul id="list">
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}
