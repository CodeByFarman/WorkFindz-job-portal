import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const JobDetails = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/api/v1/job/get/${jobId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch job details"
          );
        }

        setJobDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while fetching job details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApplyNow = async () => {
    try {
      // Call the backend to validate session
      const response = await axios.get(
        "http://localhost:5000/api/validate-session",
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      if (response.data.success) {
        // Show success toast
        toast.success("Session validated! Redirecting...");
        // Redirect to Google Form if the session is valid
        window.location.href =
          "https://docs.google.com/forms/d/e/1FAIpQLSfZ4y_9M9lLjq77kqLvuxhNIV_1-P6HcZ62pvQe0Kg_KdylvQ/viewform";
       
      } else {
        // Show error toast
        toast.error("Please log in to apply for this job.");
      }
    } catch (error) {
      console.error("Session validation failed:", error);
      toast.error("Please log in to apply for this job.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          No job details found
        </div>
      </div>
    );
  }

  return (
    <main className="main">
      <section className="section-box">
        <div className="box-head-single">
          <div className="container">
            <h3>{jobDetails.title}</h3>
            <ul className="breadcrumbs">
              <li>
                <a href="/">Home</a>
              </li>
              <li>{jobDetails.jobcategory}</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section-box mt-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="content-single">
                <h5>Description</h5>
                <p>{jobDetails.description}</p>
                {jobDetails.requirements?.length > 0 && (
                  <>
                    <h5>Requirements</h5>
                    <ul>
                      {jobDetails.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
              <div
                className="sidebar-shadow"
                style={{
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className="sidebar-heading"
                  style={{ marginBottom: "20px" }}
                >
                  <h5
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    Company Details
                  </h5>
                  <div className="sidebar-info" style={{ marginTop: "10px" }}>
                    <div
                      className="sidebar-company"
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#444",
                      }}
                    >
                      {jobDetails.companyName}
                    </div>
                    {jobDetails.companyWebsite && (
                      <div
                        className="sidebar-website-text"
                        style={{ marginTop: "5px", fontSize: "14px" }}
                      >
                        <a
                          href={jobDetails.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#6c63ff", textDecoration: "none" }}
                        >
                          {jobDetails.companyWebsite}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="text-start mt-20"
                  style={{ marginBottom: "20px" }}
                >
                  <button
                    onClick={handleApplyNow}
                    className="btn btn-default mr-10"
                    style={{
                      backgroundColor: "#6c63ff",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      textDecoration: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Apply Now
                  </button>
                </div>

                <div
                  className="details-section mt-20"
                  style={{ marginTop: "30px" }}
                >
                  <h5
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    Details
                  </h5>
                  <ul
                    style={{
                      listStyleType: "none",
                      paddingLeft: "0",
                      marginTop: "10px",
                    }}
                  >
                    <li style={{ marginBottom: "8px", fontSize: "14px" }}>
                      <strong>Salary:</strong> ₹{jobDetails.salary}
                    </li>
                    <li style={{ marginBottom: "8px", fontSize: "14px" }}>
                      <strong>Experience Level:</strong>{" "}
                      {jobDetails.experienceLevel}
                    </li>
                    <li style={{ marginBottom: "8px", fontSize: "14px" }}>
                      <strong>Location:</strong> {jobDetails.location}
                    </li>
                    <li style={{ marginBottom: "8px", fontSize: "14px" }}>
                      <strong>Job Type:</strong> {jobDetails.jobType}
                    </li>
                    <li style={{ marginBottom: "8px", fontSize: "14px" }}>
                      <strong>Date Posted:</strong>{" "}
                      {new Date(jobDetails.createdAt).toLocaleDateString()}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default JobDetails;


