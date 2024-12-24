import React, { useState, useEffect } from 'react';
import PreLoader from './PreLoader';
import HomeJobCard from './HomeJobCard';
import { Button } from '@mui/material'; // Import Material-UI Button
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Import Arrow icons

const RecentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch jobs from the API on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/job/get'); // Replace with your API URL
        const data = await response.json();
        if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs); // If the jobs are inside a "jobs" key
        } else {
          setJobs([]);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  // Calculate the current jobs to display
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="section-box mt-40">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-4">
            <h2 className="section-title mb-20 wow animate__animated animate__fadeInUp">
              Recent Jobs
            </h2>
            <p className="text-md-lh28 color-black-5 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
              {jobs.length} new opportunities posted today!
            </p>
          </div>

          <div className="col-lg-8 text-xl-end text-start">
            {/* Your Tabs */}
          </div>

          <div className="row">
            {/* Display Jobs */}
            {Array.isArray(currentJobs) && currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <HomeJobCard key={job.id || job._id || job.title} job={job} />
              ))
            ) : (
              <p>No jobs available at the moment.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                margin: '0 10px',
                minWidth: '40px',
                height: '40px',
                backgroundColor: 'transparent',
                color: 'black',
                borderRadius: '50%',
                border: '2px solid #ccc',
                transition: 'all 0.3s',
              }}
            >
              <ArrowBack />
            </Button>

            <span style={{ margin: 'auto', paddingTop: '8px' }}>{currentPage}</span>

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= jobs.length}
              style={{
                margin: '0 10px',
                minWidth: '40px',
                height: '40px',
                backgroundColor: 'transparent',
                color: 'black',
                borderRadius: '50%',
                border: '2px solid #ccc',
                transition: 'all 0.3s',
              }}
            >
              <ArrowForward />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentJobs;
