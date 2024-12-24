import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs'; // Replace with your backend API URL

// Create a new Job
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Success response
  } catch (error) {
    console.error('Error creating job:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Get all Jobs
export const getAllJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.jobs; // Return the list of jobs
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Get a Job by Id
export const getJobById = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/${jobId}`);
    return response.data.job; // Return the specific job details
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Update a Job
export const updateJob = async (jobId, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/${jobId}`, jobData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.job; // Return updated job
  } catch (error) {
    console.error('Error updating job:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a Job
export const deleteJob = async (jobId) => {
  try {
    const response = await axios.delete(`${API_URL}/${jobId}`);
    return response.data.message; // Return delete success message
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Apply to a Job
export const applyToJob = async (jobId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/apply/${jobId}`, { userId });
    return response.data.message; // Return application success message
  } catch (error) {
    console.error('Error applying to job:', error);
    throw error.response ? error.response.data : error.message;
  }
};
