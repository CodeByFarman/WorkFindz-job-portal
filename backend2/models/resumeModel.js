// import mongoose from "mongoose";

// const ResumeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   workExperience: [
//     {
//       company: { type: String, required: true },
//       position: { type: String, required: true },
//       duration: { type: String, required: true },
//       description: { type: String, required: true },
//     },
//   ],
//   education: [
//     {
//       degree: { type: String, required: true },
//       institution: { type: String, required: true },
//       year: { type: String, required: true },
//     },
//   ],
//   skills: [{ type: String, required: true }],
//   certifications: [{ type: String }],
// });

// const Resume = mongoose.model("Resume", ResumeSchema);
// export default Resume;

import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  education: [
    {
      institution: String,
      degree: String,
      startYear: String,
      endYear: String,
    },
  ],
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  skills: [String],
}, { timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
