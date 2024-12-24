// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     requirements: [
//       {
//         type: String,
//       },
//     ],
//     salary: {
//       type: Number,
//       required: true,
//     },
//     experienceLevel: {
//       type: String, // Experience level as a string
//       required: true,
//       enum: ["expert", "senior", "junior", "regular", "internship", "associate"], // Enum validation for predefined values
//     },
//     location: {
//       type: String, // Location as a string
//       required: true,
//     },
//     jobType: {
//       type: String, // Job type as a string
//       required: true,
//       enum: ["fullTime", "partTime", "remote", "freelance", "temporary"], // Enum validation for predefined values
//     },
//     category: {
//       type: String, // Category as a string
//       required: true,
//     },
//     position: {
//       type: Number,
//       required: true,
//     },
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Company",
//       required: true,
//     },
//     created_by: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     applications: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Application",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export const Job = mongoose.model("Job", jobSchema);


import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    salary: {
      type: Number,
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
      enum: ["expert", "senior", "junior", "regular", "internship", "associate"],
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["fullTime", "partTime", "remote", "freelance", "temporary"],
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    companyName: { 
      type: String, 
      required: true, // Make this required if needed
    },
    companyWebsite: { 
      type: String, 
      required: true, // Make this required if needed
    },
    jobcategory: { 
      type: String,
      required: true, 
    },
    skills: { 
      type: [String], 
    },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
    },    
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
