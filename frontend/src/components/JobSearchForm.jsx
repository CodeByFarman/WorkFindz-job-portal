import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';


// Debounce function moved outside of component for optimization
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const JobSearchForm = () => {
  const [formData, setFormData] = useState({
    keyword: "",
    location: "",
  });
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(formData.keyword);
  const navigate = useNavigate();

  // UseRef for debouncing instead of using state
  const debouncedQueryRef = useRef(debouncedSearchQuery);

  useEffect(() => {
    const handler = debounce(() => {
      debouncedQueryRef.current = formData.keyword; // Directly update ref
      setDebouncedSearchQuery(debouncedQueryRef.current); // Update state for UI to react
    }, 500);

    handler(); // Call the debounced function

    return () => clearTimeout(handler); // Cleanup on unmount
  }, [formData.keyword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Navigate to job list page with the query params
    navigate(`/joblist?keyword=${debouncedSearchQuery}&location=${formData.location}`);

    // Use debouncedSearchQuery for the API request
    axios
      .get('http://localhost:5000/api/v1/job/get', { params: { keyword: debouncedSearchQuery, location: formData.location } })
      .then((response) => {
        console.log('Search Results:', response.data);
        // Optionally, set state with results
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  };

  return (
    <div className="form-find mt-60 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="keyword"
          className="form-input input-keysearch mr-10"
          placeholder="Job title, Company..."
          value={formData.keyword}
          onChange={handleInputChange}
        />
        {/* <select
          name="location"
          className="form-input mr-10 select-active"
          value={formData.location}
          onChange={handleInputChange}
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select> */}
                {/* Location Input Box */}
                {/* <input
          type="text"
          name="location"
          className="form-input mr-10"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
        /> */}
        <button type="submit" className="btn btn-default btn-find">
          Find now
        </button>
      </form>
    </div>
  );
};

export default JobSearchForm;
