import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    location: "",
    jobcategory: "",
    jobTypes: {
      fullTime: false,
      partTime: false,
      remote: false,
      freelance: false,
      temporary: false,
    },
    experienceLevels: {
      expert: false,
      senior: false,
      junior: false,
      regular: false,
      internship: false,
      associate: false,
    },
    salaryRange: [0, 100000],
  });

  // Fetch all jobs without pagination
  const fetchJobs = async (filters) => {
    setLoading(true);
    try {
      const formatJobTypes = () =>
        Object.keys(filters.jobTypes)
          .filter((key) => filters.jobTypes[key])
          .join(","); // Join selected types into a comma-separated string

      const formatExperienceLevels = () =>
        Object.keys(filters.experienceLevels)
          .filter((key) => filters.experienceLevels[key])
          .join(","); // Join selected levels into a comma-separated string

      const formattedFilters = {
        ...filters,
        jobTypes: formatJobTypes(), // Send as a string
        experienceLevels: formatExperienceLevels(), // Send as a string
      };

      const salaryRangeFormatted = `${formattedFilters.salaryRange[0]},${formattedFilters.salaryRange[1]}`;

      const response = await axios.get("http://localhost:5000/api/v1/job/get", {
        params: {
          location: formattedFilters.location,
          jobcategory: formattedFilters.category,
          jobTypes: formattedFilters.jobTypes,
          experienceLevels: formattedFilters.experienceLevels,
          salaryRange: salaryRangeFormatted,
        },
      });

      setJobs(response.data.jobs || []);
      setFilteredJobs(response.data.jobs || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const location = useLocation();

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";
  const locationParam = queryParams.get("location") || "";

  // Update filters and search query
  setFilters((prevFilters) => ({
    ...prevFilters,
    location: locationParam,
  }));

  setSearchQuery(keyword);
}, [location.search]);


  // Apply search query filter
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchQuery, jobs]);

  // Paginate jobs based on current page
  const paginateJobs = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset current page when filtered jobs change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredJobs]);

  // Apply filters and fetch jobs
  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentJobs = paginateJobs();

  return (
    <section className="section-box mt-80">
      <section className="job-listing-page">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="content-page">
                <div className="box-filters-job mt-15 mb-10">
                  <div className="row">
                    <div className="col-lg-7">
                      <span className="text-small">
                        Showing{" "}
                        <strong>
                          {(currentPage - 1) * itemsPerPage + 1}-
                          {Math.min(
                            currentPage * itemsPerPage,
                            filteredJobs.length
                          )}
                        </strong>{" "}
                        of <strong>{filteredJobs.length}</strong> jobs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="search-bar mb-30">
                  <input
                    type="text"
                    placeholder="Search job titles or companies"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="row">
                  {Array.isArray(currentJobs) && currentJobs.length > 0 ? (
                    currentJobs.map((job, index) => (
                      <div key={index} className="col-lg-4 col-md-6">
                        <JobCard job={job} />
                      </div>
                    ))
                  ) : (
                    <p>No jobs found.</p>
                  )}
                </div>

                {filteredJobs.length > 0 && (
                  <Pagination
                    totalItems={filteredJobs.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>

            <div className="col-lg-3 col-md-12 col-sm-12 col-12">
              <Sidebar
                keyword={searchQuery} // The keyword from the homepage search
                location={filters.location} // The location from the filters (or homepage location)
                onApplyFilter={(newFilters) => setFilters(newFilters)}
                onResetFilter={() =>
                  setFilters({
                    location: "",
                    category: "",
                    jobTypes: {
                      fullTime: false,
                      partTime: false,
                      remote: false,
                      freelance: false,
                      temporary: false,
                    },
                    experienceLevels: {
                      expert: false,
                      senior: false,
                      junior: false,
                      regular: false,
                      internship: false,
                      associate: false,
                    },
                    salaryRange: [0, 100000],
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>
    </section>

  );
};

export default JobList;
