import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostJob = ({ setJobs }) => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    salary: '',
    experienceLevel: '',
    location: '',
    jobType: '',
    jobcategory: '', // Changed to match backend
    companyName: '',
    companyWebsite: '',
    requirements: '', // Added requirements field (for comma-separated values)
    skills: '',  // Added skills field (for comma-separated values)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/job/post', job, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setJobs((prevJobs) => [...prevJobs, response.data.job]); // Add new job to jobs list
      setJob({
        title: '',
        description: '',
        salary: '',
        experienceLevel: '',
        location: '',
        jobType: '',
        jobcategory: '',
        companyName: '',
        companyWebsite: '',
        requirements: '',
        skills: '',
      }); // Reset form

      // Show success toast
      toast.success('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job:', error);
      // Show error toast
      toast.error(error.response?.data?.message || 'Error posting job. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h5">Post a New Job</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              name="title"
              value={job.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Full Description */}
          <Grid item xs={12}>
            <TextField
              label="Full Description"
              name="description"
              value={job.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={1}
            />
          </Grid>

          {/* Salary */}
          <Grid item xs={12}>
            <TextField
              label="Salary"
              name="salary"
              value={job.salary}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Experience Level */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Experience Level</InputLabel>
              <Select
                label="Experience Level"
                name="experienceLevel"
                value={job.experienceLevel}
                onChange={handleChange}
              >
                <MenuItem value="junior">Junior</MenuItem>
                <MenuItem value="regular">Regular</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
                <MenuItem value="associate">Associate</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={job.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Job Type */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                label="Job Type"
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
              >
                <MenuItem value="fullTime">Full Time</MenuItem>
                <MenuItem value="partTime">Part Time</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="freelance">Freelance</MenuItem>
                <MenuItem value="temporary">Temporary</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Job Category */}
          <Grid item xs={12}>
            {/* <TextField
              label="Job Category"
              name="jobcategory"
              value={job.jobcategory}
              onChange={handleChange}
              fullWidth
            /> */}
            <FormControl fullWidth>
    <InputLabel>Job Category</InputLabel>
    <Select
      label="Job Category"
      name="jobcategory"
      value={job.jobcategory}
      onChange={handleChange}
    >
      <MenuItem value="Marketing & Communication">Marketing & Communication</MenuItem>
      <MenuItem value="Content Writer">Content Writer</MenuItem>
      <MenuItem value="Graphic Design">Graphic Design</MenuItem>
      <MenuItem value="UI/UX Design">UI/UX Design</MenuItem>
      <MenuItem value="Web Development">Web Development</MenuItem>
      <MenuItem value="Data Science">Data Science</MenuItem>
      <MenuItem value="Human Resource">Human Resource</MenuItem>
    </Select>
  </FormControl>
          </Grid>

          {/* Company Name */}
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              name="companyName"
              value={job.companyName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Company Website */}
          <Grid item xs={12}>
            <TextField
              label="Company Website"
              name="companyWebsite"
              value={job.companyWebsite}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Requirements */}
          <Grid item xs={12}>
            <TextField
              label="Job Requirements (comma separated)"
              name="requirements"
              value={job.requirements}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Skills */}
          <Grid item xs={12}>
            <TextField
              label="Skills (comma separated)"
              name="skills"
              value={job.skills}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Post Job
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PostJob;
