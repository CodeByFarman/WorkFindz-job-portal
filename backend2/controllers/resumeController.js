// import Resume from "../models/resumeModel.js";

// // Create a new resume
// export const createResume = async (req, res, next) => {
//   try {
//     const resume = new Resume(req.body);
//     const savedResume = await resume.save();
//     res.status(201).json({ success: true, data: savedResume });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all resumes
// export const getAllResumes = async (req, res, next) => {
//   try {
//     const resumes = await Resume.find();
//     res.status(200).json({ success: true, data: resumes });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get a single resume by ID
// export const getResumeById = async (req, res, next) => {
//   try {
//     const resume = await Resume.findById(req.params.id);
//     if (!resume) {
//       return res.status(404).json({ success: false, message: "Resume not found" });
//     }
//     res.status(200).json({ success: true, data: resume });
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete a resume by ID
// export const deleteResume = async (req, res, next) => {
//   try {
//     const resume = await Resume.findByIdAndDelete(req.params.id);
//     if (!resume) {
//       return res.status(404).json({ success: false, message: "Resume not found" });
//     }
//     res.status(200).json({ success: true, message: "Resume deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

import Resume from "../models/resumeModel.js";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    const savedResume = await resume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a resume by ID
export const updateResume = async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a resume by ID
export const deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);
    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
