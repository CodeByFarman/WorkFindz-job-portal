import express from "express";
import { getAllJobs, getJobById, postJob, deleteJob, updateJob, getCategoryCounts  } from "../controllers/job.controller.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

//Post a Job
router.route("/post").post(postJob);

//Get all jobs
router.route("/get").get(getAllJobs);

//Get a single job
router.route("/get/:id").get(getJobById);

// New route for fetching category counts
router.get("/categories/count", getCategoryCounts);

// Add the delete job route
router.route("/:id").delete(protect, deleteJob);

// Add the update job route (this is the new route for handling PUT requests)
router.route("/:id").put(protect, updateJob);

export default router;

