import { Job } from "../models/job.model.js";
import mongoose from "mongoose";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, companyName, companyWebsite, jobcategory, skills } = req.body;


        // Check if all required fields are provided
        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !companyName|| !companyWebsite || !jobcategory) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Create the job post
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experienceLevel,
            companyName,  // New field// New field
            companyWebsite,  // New field
            jobcategory,  // New field
            skills: skills.split(","),
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error, try again later.",
            success: false
        });
    }
}


//To get all jobs
export const getAllJobs = async (req, res) => {
    try {
        // Parse query parameters
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const jobcategory = req.query.jobcategory || "";
        const jobTypes = req.query.jobTypes ? req.query.jobTypes.split(",") : [];
        const experienceLevels = req.query.experienceLevels
            ? req.query.experienceLevels.split(",")
            : [];
        const salaryRange = req.query.salaryRange
            ? req.query.salaryRange.split(",").map(Number)
            : [0, 100000];

        console.log("Filters received:", {
            keyword,
            location,
            jobcategory,
            jobTypes,
            experienceLevels,
            salaryRange,
        });

        // Build query object dynamically
        const query = {
            $and: [
                {
                    $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } },
                    ],
                },
                location && { location: { $regex: location, $options: "i" } },
                jobcategory && { jobcategory: { $regex: jobcategory, $options: "i" } },
                jobTypes.length > 0 && { jobType: { $in: jobTypes } },
                experienceLevels.length > 0 && { experienceLevel: { $in: experienceLevels } },
                {
                    $or: [
                        { salary: { $gte: salaryRange[0], $lte: salaryRange[1] } },
                        {
                            "salaryRange.min": { $lte: salaryRange[1] },
                            "salaryRange.max": { $gte: salaryRange[0] },
                        },
                    ],
                },
            ].filter(Boolean),
        };
        

        console.log("MongoDB Query:", JSON.stringify(query, null, 2));

        // Fetch jobs based on the query
        const jobs = await Job.find(query)
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(200).json({
                message: "Jobs not found.",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error); // Log detailed error
        res.status(500).json({
            message: "Error fetching jobs.",
            success: false,
        });
    }
};


// Get Job By Id
export const getJobById = async (req, res) => {
    try {
        console.log("Job ID:", req.params.id); // Debugging line
        const jobId = req.params.id;
         // Validate the job ID
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
          message: "Invalid or missing Job ID.",
          success: false,
        });
      }
        const job = await Job.findById(jobId).populate([
            { path: "applications" }, 
        ]);

        if (!job) {
            return res.status(200).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: job, 
        });
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the job details.",
            success: false,
        });
    }
};



// Get job counts grouped by category
export const getCategoryCounts = async (req, res) => {
    try {
        // Use MongoDB's aggregation pipeline to group by category and count jobs
        const categoryCounts = await Job.aggregate([
            {
                $group: {
                    _id: "$jobcategory", // Group by the 'jobcategory' field
                    count: { $sum: 1 },  // Count the number of jobs per category
                },
            },
            {
                $project: {
                    _id: 0,              // Exclude the default _id field
                    category: "$_id",    // Rename _id to category
                    count: 1,            // Include the count field
                },
            },
        ]);

        // Return the result
        return res.status(200).json({
            success: true,
            categories: categoryCounts,
        });
    } catch (error) {
        console.error("Error fetching category counts:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching category counts.",
        });
    }
};




// Update Job By id
export const updateJob = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      // Find the job by ID and update it
      const updatedJob = await Job.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Return the updated job data
      return res.status(200).json(updatedJob);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  // Delete Job By id
  export const deleteJob = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the job by ID and remove it
      const deletedJob = await Job.findByIdAndDelete(id);
  
      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Return success message after deletion
      return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };