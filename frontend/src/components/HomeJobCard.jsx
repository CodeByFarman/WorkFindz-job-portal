import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // Import Link from React Router


const HomeJobCard = ({ job }) => {
    // Function to calculate time ago
    const getTimeAgo = (date) => {
      const now = new Date();
      const postedDate = new Date(date);
      const secondsAgo = Math.floor((now - postedDate) / 1000);
  
      if (secondsAgo < 60) return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""}`;
      if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minute${Math.floor(secondsAgo / 60) > 1 ? "s" : ""}`;
      if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hour${Math.floor(secondsAgo / 3600) > 1 ? "s" : ""}`;
      return `${Math.floor(secondsAgo / 86400)} day${Math.floor(secondsAgo / 86400) > 1 ? "s" : ""}`;
    };  
  return (               
    <div className="mt-70 col-lg-4 col-md-6">
      <div className="card-grid-2 hover-up">
        <div className="text-center card-grid-2-image">
          {/* <a href={`/job/${job._id}`}>
            <figure>
              <img src={job.image || 'assets/imgs/jobs/job-1.png'} alt="jobhub" />
            </figure>
          </a> */}
          {/* {job.urgent && <label className="btn-urgent">Urgent</label>} */}
        </div>
        <div className="card-block-info">
          <div className="row">
            <div className="col-lg-7 col-6">
              {/* <a href={`/employers-single/${job.employerId}`} className="card-2-img-text">
                <span className="card-grid-2-img-small">
                  <img src={job.employerLogo || 'assets/imgs/jobs/logos/logo-1.svg'} alt="jobhub" />
                </span>
                <span>{job.employerName}</span>
              </a> */}
            </div>
            <div className="col-lg-5 col-6 text-end">
              <a  className="btn btn-grey-small disc-btn">{job.jobType}</a>
            </div>
          </div>
          <h5 className="mt-20"><a href={`/job/${job._id}`}>{job.title}</a></h5>
          <div className="mt-15">
            <span className="card-time">{getTimeAgo(job.createdAt)} ago</span>
            <span className="card-location">{job.location}</span>
          </div>
           <div className="card-2-bottom mt-30">
            <div className="row">
              {/* <div className="col-lg-7 col-8">
                <span className="card-text-price">₹{job.salary}<span>/Month</span></span>
                <Button>Apply Now</Button>
              </div>  */}
              {/* Salary and Button Inline */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#007bff", fontSize: "18px", fontWeight: "bold" }}>
                ₹{job.salary}<span style={{ fontWeight: "normal" }}>/Month</span>
              </span>
                {/* Wrap the Button in a Link */}
              <Link to={`/job/${job._id}`} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" size="small">
                Apply Now
              </Button>
              </Link>
            </div>
              {/* <div className="col-lg-5 col-4 text-end">
                <span><img src="assets/imgs/theme/icons/shield-check.svg" alt="jobhub" /></span>
                <span className="ml-5"><img src="assets/imgs/theme/icons/bookmark.svg" alt="jobhub" /></span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeJobCard;
