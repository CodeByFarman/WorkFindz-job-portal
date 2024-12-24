// import express from "express";
// import {
//   createResume,
//   getAllResumes,
//   getResumeById,
//   deleteResume,
// } from "../controllers/resumeController.js";

// const router = express.Router();

// router.post("/create", createResume);
// router.get("/", getAllResumes);
// router.get("/:id", getResumeById);
// router.delete("/:id", deleteResume);

// export default router;

import express from "express";
import {
  createResume,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/", createResume);
router.get("/:id", getResumeById);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;
