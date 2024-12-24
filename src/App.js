import React, { useState } from 'react';
import './App.css';

const BrandSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);  // Change to an array to store multiple results
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const clientId = '1idvOsl6V9yKNEXb6lS'; // Replace with your actual client ID
    const options = {
      method: 'GET',
    };

    try {
      const response = await fetch(`https://api.brandfetch.io/v2/search/${query}?c=${clientId}`, options);
      const data = await response.json();
      console.log(data);

      // Check for errors in response
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: Unable to fetch data`);
      }

      if (data.length > 0) {
        setResults(data); // Store multiple results in an array
      } else {
        setResults([]); // Clear results if no matches found
      }
    } catch (err) {
      setError(err.message);
      setResults([]); // Clear results on error
    }
  };

  return (
    <div className="brand-search-container">
      <h1>Brand Search</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter brand name or domain"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="result-container">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result-card">
              <h3 className="brand-name">{result.name}</h3>
              <p className="brand-domain">Domain: {result.domain}</p>

              {/* Display the brand icon */}
              {result.icon && (
                <div className="brand-icon">
                  <img src={result.icon} alt={`${result.name} icon`} width="100" />
                </div>
              )}

              {/* Download link for the icon */}
              {result.icon && (
                <a
                  href={result.icon}
                  download={`${result.name}-icon`}
                  className="download-link"
                >
                  Download Icon
                </a>
              )}
            </div>
          ))
        ) : (
          !error && <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default BrandSearch;
