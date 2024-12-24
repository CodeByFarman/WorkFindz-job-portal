import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobManagement = ({ jobs, setJobs }) => {
  const [editingJob, setEditingJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  // Handle Edit job
  const handleEdit = (job) => {
    setEditingJob({ ...job }); // Clone job data into editingJob state
  };

  // Handle Save Changes after editing
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      const response = await axios.put(
        `http://localhost:5000/api/v1/job/${editingJob._id}`,
        editingJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === response.data._id ? response.data : job
        )
      );
      setEditingJob(null); // Close the form
      toast.success("Job updated successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update the job. Please try again.");
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingJob((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Delete job
  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      await axios.delete(`http://localhost:5000/api/v1/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete the job. Please try again.");
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {/* Job Listings */}
      <Typography variant="h5" gutterBottom>
        Job Listings
      </Typography>
      <Grid container spacing={2}>
        {currentJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">{job.title}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(job)}
                sx={{ marginTop: 1, marginRight: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(job._id)}
                sx={{ marginTop: 1 }}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBack />
        </IconButton>
        <Typography variant="body1" sx={{ marginX: 2 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Edit Form */}
      {editingJob && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5">Edit Job: {editingJob.title}</Typography>
          <form>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={editingJob.title || ''}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={editingJob.description || ''}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              value={editingJob.salary || ''}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Experience Level"
              name="experienceLevel"
              value={editingJob.experienceLevel || ''}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={editingJob.location || ''}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Job Type"
              name="jobType"
              value={editingJob.jobType || ''}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Job Category"
              name="jobcategory"
              value={editingJob.jobcategory || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={editingJob.companyName || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Company Website"
              name="companyWebsite"
              value={editingJob.companyWebsite || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Requirements (comma-separated)"
              name="requirements"
              value={editingJob.requirements || ''}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Skills (comma-separated)"
              name="skills"
              value={editingJob.skills || ''}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <Box>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditingJob(null)}
                sx={{ marginLeft: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </div>
  );
};

export default JobManagement;
