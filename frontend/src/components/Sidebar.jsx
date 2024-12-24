import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onApplyFilter, onResetFilter, keyword, location }) => {
    const navigate = useNavigate(); // Get navigate function from react-router-dom
    // Initialize state with the keyword and location passed from the parent
    const [searchKeyword, setSearchKeyword] = useState(keyword || ""); // Initialize with keyword from parent
    const [searchLocation, setSearchLocation] = useState(location || ""); // Initialize with location from parent

    // Other filters states
    const [category, setCategory] = useState("");
    const [jobTypes, setJobTypes] = useState({
        fullTime: false,
        partTime: false,
        remote: false,
        freelance: false,
        temporary: false,
    });
    const [experienceLevels, setExperienceLevels] = useState({
        expert: false,
        senior: false,
        junior: false,
        regular: false,
        internship: false,
        associate: false,
    });
    const [salaryRange, setSalaryRange] = useState([0, 100000]);

    // Effect hook to update searchKeyword and searchLocation when the props change
    useEffect(() => {
        setSearchKeyword(keyword || "");
        setSearchLocation(location || "");
    }, [keyword, location]);

    // Handle job type changes (checkboxes)
    const handleJobTypeChange = (event) => {
        const { name, checked } = event.target;
        setJobTypes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handle experience level changes (checkboxes)
    const handleExperienceLevelChange = (event) => {
        const { name, checked } = event.target;
        setExperienceLevels((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handle salary range changes
    const handleSalaryChange = (newValue) => {
        setSalaryRange(newValue);
    };

    // Apply filter based on selected values
    const handleApplyFilter = () => {
        onApplyFilter({
            location: searchLocation,
            category,
            jobTypes,
            experienceLevels,
            salaryRange,
        });
    };

    // Reset filter logic
    const handleResetFilter = () => {
        // Reset local state in the Sidebar component
        setSearchKeyword(""); // Reset the keyword (job title)
        setSearchLocation(""); // Reset the location
        setCategory(""); // Reset category filter
        setJobTypes({
            fullTime: false,
            partTime: false,
            remote: false,
            freelance: false,
            temporary: false,
        });
        setExperienceLevels({
            expert: false,
            senior: false,
            junior: false,
            regular: false,
            internship: false,
            associate: false,
        });
        setSalaryRange([0, 100000]); // Reset salary range

        // Reset the filters in the parent component (JobList)
        onResetFilter(); // This will reset the filtered jobs in the parent component

         // Now, reset the URL query parameters (keyword and location) using navigate
         navigate("/joblist"); // This will reset the URL query params
    };

    return (
        <div className="filter-block mb-30">
            {/* Location Filter */}
            <div className="filter-block mb-30">
                <h5 className="medium-heading mb-15">Location</h5>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-icons"
                        placeholder="Location"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)} // Update location state
                    />
                    <i className="fi-rr-marker"></i>
                </div>
            </div>

            {/* Category Filter */}
            <div className="filter-block mb-30">
                <h5 className="medium-heading mb-15">Category</h5>
                <div className="form-group select-style select-style-icon">
                    <select
                        className="form-control form-icons select-active"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} // Update category state
                    >   
                        <option>Select Category</option>
                        <option> Marketing & Communication</option>           
                        <option>Content Writer</option>
                        <option>Graphic Design</option>
                        <option>UI/UX Design</option>
                        <option>Web Development</option>
                        <option>Data Science</option>
                        <option>Human Resource</option>
                    </select>
                    <i className="fi-rr-briefcase"></i>
                </div>
            </div>

            {/* Job Type Filter */}
            <div className="filter-block mb-30">
                <h5 className="medium-heading mb-15">Job Type</h5>
                <div className="form-group">
                    <ul className="list-checkbox">
                        {["fullTime", "partTime", "remote", "freelance", "temporary"].map((jobType) => (
                            <li key={jobType}>
                                <label className="cb-container">
                                    <input
                                        type="checkbox"
                                        name={jobType}
                                        checked={jobTypes[jobType]}
                                        onChange={handleJobTypeChange} // Handle job type checkbox change
                                    />
                                    <span className="text-small">{jobType.replace(/([A-Z])/g, " $1")}</span>
                                    <span className="checkmark"></span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Experience Level Filter */}
            <div className="filter-block mb-30">
                <h5 className="medium-heading mb-10">Experience Level</h5>
                <div className="form-group">
                    <ul className="list-checkbox">
                        {[
                            "expert",
                            "senior",
                            "junior",
                            "regular",
                            "internship",
                            "associate",
                        ].map((experienceLevel) => (
                            <li key={experienceLevel}>
                                <label className="cb-container">
                                    <input
                                        type="checkbox"
                                        name={experienceLevel}
                                        checked={experienceLevels[experienceLevel]}
                                        onChange={handleExperienceLevelChange} // Handle experience level checkbox change
                                    />
                                    <span className="text-small">{experienceLevel}</span>
                                    <span className="checkmark"></span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Salary Range Filter */}
            <div className="filter-block mb-40">
                <h5 className="medium-heading mb-25">Salary Range</h5>
                <div className="">
                    <div className="row mb-20">
                        <div className="col-sm-12">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="1000"
                                value={salaryRange[0]}
                                onChange={(e) => handleSalaryChange([Number(e.target.value), salaryRange[1]])} // Handle salary range change
                            />
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="1000"
                                value={salaryRange[1]}
                                onChange={(e) => handleSalaryChange([salaryRange[0], Number(e.target.value)])} // Handle salary range change
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <label className="lb-slider">From</label>
                            <div className="form-group minus-input">
                                <input
                                    type="text"
                                    className="input-disabled form-control min-value-money"
                                    disabled
                                    value={`$${salaryRange[0]}`}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label className="lb-slider">To</label>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="input-disabled form-control max-value-money"
                                    disabled
                                    value={`$${salaryRange[1]}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="buttons-filter">
                <button className="btn btn-default" onClick={handleApplyFilter}>
                    Apply filter
                </button>
                <button className="btn" onClick={handleResetFilter}>
                    Reset filter
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
