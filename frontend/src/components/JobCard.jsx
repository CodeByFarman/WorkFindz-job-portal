import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Button from '@mui/material/Button';

const JobCard = ({ job }) => {
  // Function to calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const secondsAgo = Math.floor((now - postedDate) / 1000);

    if (secondsAgo < 60)
      return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""}`;
    if (secondsAgo < 3600)
      return `${Math.floor(secondsAgo / 60)} minute${
        Math.floor(secondsAgo / 60) > 1 ? "s" : ""
      }`;
    if (secondsAgo < 86400)
      return `${Math.floor(secondsAgo / 3600)} hour${
        Math.floor(secondsAgo / 3600) > 1 ? "s" : ""
      }`;
    return `${Math.floor(secondsAgo / 86400)} day${
      Math.floor(secondsAgo / 86400) > 1 ? "s" : ""
    }`;
  };
  return (
    <div className="card-grid-2 hover-up">
      <div className="text-center card-grid-2-image">
        <Link to={`/job/${job.id}`}>
          {/* <figure>
            <img alt={job.companyName} src={job.imageUrl} />
          </figure> */}
        </Link>
        {job.isUrgent && <label className="btn-urgent">Urgent</label>}
      </div>
      <div className="card-block-info">
        <div className="row">
          <div className="col-lg-7 col-6"></div>
          <div className="col-lg-5 col-6 text-end">
            <span className="btn btn-grey-small disc-btn">{job.jobType}</span>
          </div>
        </div>
        <h5 className="mt-20">
          <Link to={`/job/${job._id}`}>{job.title}</Link>
        </h5>
        <div className="mt-15">
          <span className="card-time">{getTimeAgo(job.createdAt)} ago</span>
          <span className="card-location">{job.location}</span>
        </div>
        <div className="card-2-bottom mt-30">
          <div className="row">
            <div className="col-lg-7 col-8">
              <span className="card-text-price">
                ₹{job.salary}
                <span>/Month</span>
              </span>
              {/* Wrap the Button in a Link */}
              <Link to={`/job/${job._id}`} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary" size="small">
                  Apply Now
                </Button>
              </Link>
            </div>
            <div className="col-lg-5 col-4 text-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
