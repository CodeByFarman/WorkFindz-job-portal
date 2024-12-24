import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DeleteIcon from "@mui/icons-material/Delete";
import "jspdf-autotable";
import html2pdf from "html2pdf.js";
import DOMPurify from "dompurify"; // Import DOMPurify
import "../index.css";

const ResumeForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [workExperience, setWorkExperience] = useState([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [education, setEducation] = useState([
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [skills, setSkills] = useState([]);

  const [currentStep, setCurrentStep] = useState(0); // Track the current step

  const steps = [
    { title: "Personal Information", fields: personalInfo },
    { title: "Work Experience", fields: workExperience },
    { title: "Education", fields: education },
    { title: "Skills", fields: skills },
  ];


  const handleChange = (setState, index, field, value) => {
    setState((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddSection = (setState, emptyItem) => {
    setState((prev) => [...prev, emptyItem]);
  };

  const handleRemoveSection = (setState, index) => {
    setState((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  const handleDownloadPDF = async () => {
    const element = document.querySelector(".resume-preview"); // Select the preview container

    if (!element) {
      console.error("Resume preview element not found!");
      return;
    }

    // Store original content
    const originalContent = element.innerHTML;

    // Update skills section with comma-separated values
    const skillsDiv = element.querySelector("#skills");
    if (skillsDiv) {
      const formattedSkills = skills.join(", ");
      skillsDiv.textContent = formattedSkills; // Render skills as a comma-separated string
    }

    // Temporarily hide the "Resume Preview" header
    const headerDiv = element.querySelector("h5");
    if (headerDiv) {
      headerDiv.style.display = "none"; // Temporarily hide header during PDF generation
    }

    // Adjust bullet points spacing for the preview content
    const listItems = element.querySelectorAll("li");
    listItems.forEach((item) => {
      item.style.marginBottom = "0.5rem"; // Add spacing between bullets and the next text
      item.style.paddingLeft = "1rem"; // Ensure proper indentation for bullet points
      item.style.marginBottom = "0"; // Remove bottom margin
      item.style.paddingBottom = "0"; // Remove bottom padding
    });

    try {
      // Configure html2pdf.js options
      const options = {
        margin: [10, 10, 10, 10], // Margins for the PDF
        filename: "resume.pdf", // File name for the downloaded PDF
        image: { type: "jpeg", quality: 0.98 }, // Image quality for rendering
        html2canvas: {
          scale: 2, // Higher scale for better resolution
          useCORS: true, // Enable cross-origin images
          scrollX: 0, // Prevent clipping due to horizontal overflow
          scrollY: 0, // Prevent clipping due to vertical overflow
        },
        jsPDF: {
          unit: "mm",
          format: "a4", // PDF format (A4 standard)
          orientation: "portrait", // Layout of the document
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      // Restore original content
      element.innerHTML = originalContent;

      // Restore visibility of the "Resume Preview" header
      if (headerDiv) {
        headerDiv.style.display = "block";
      }
        // Reload the page to reset the state
        window.location.reload();
    }
  };

  const renderFormFields = () => {
    const step = steps[currentStep];

    switch (currentStep) {
      case 0:
        return Object.entries(step.fields).map(([key, value]) => (
          <TextField
            key={key}
            fullWidth
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, [key]: e.target.value })
            }
            margin="normal"
            variant="outlined"
          />
        ));
      case 1:
        return (
          <Box>
            {workExperience.map((exp, index) => (
              <Box key={index} mb={3} sx={{ borderBottom: "1px solid #ddd", pb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Work Experience #{index + 1}
                </Typography>
                <TextField
                  fullWidth
                  label="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleChange(setWorkExperience, index, "company", e.target.value)
                  }
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Position"
                  value={exp.position}
                  onChange={(e) =>
                    handleChange(setWorkExperience, index, "position", e.target.value)
                  }
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Start Year"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleChange(setWorkExperience, index, "startDate", e.target.value)
                  }
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="End Year"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleChange(setWorkExperience, index, "endDate", e.target.value)
                  }
                  margin="normal"
                  variant="outlined"
                />
                <Typography variant="body1" mt={2}>
                  Description:
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: 1,
                    minHeight: 150,
                    mt: 1,
                  }}
                >
                  <Editor
                    apiKey="i8981nf1t4tgfxemqlz33mii8htybky15wy1dqzb51ho6v24"
                    value={exp.description}
                    onEditorChange={(newDescription) =>
                      handleChange(
                        setWorkExperience,
                        index,
                        "description",
                        newDescription
                      )
                    }
                    init={{
                      height: 150,
                      menubar: false,
                      plugins: "lists link",
                      toolbar: "bold italic  | bullist numlist",
                      readonly: false,
                    }}
                  />
                </Box>
                <IconButton
                  onClick={() => handleRemoveSection(setWorkExperience, index)}
                  color="error"
                  sx={{ mt: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {/* "Add Work Experience" button outside of the map */}
            <Button
              onClick={() =>
                handleAddSection(setWorkExperience, {
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              variant="outlined"
              sx={{ mt: 2 }}
            >
              + Add Work Experience
            </Button>
          </Box>
        );
      case 2:       
  return (
    <Box>
      {education.map((edu, index) => (
        <Box key={index} mb={3} sx={{ borderBottom: "1px solid #ddd", pb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Education #{index + 1}
          </Typography>
          <TextField
            fullWidth
            label="Institution"
            value={edu.institution}
            onChange={(e) =>
              handleChange(setEducation, index, "institution", e.target.value)
            }
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Degree"
            value={edu.degree}
            onChange={(e) =>
              handleChange(setEducation, index, "degree", e.target.value)
            }
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Start Year"
            value={edu.startDate}
            onChange={(e) =>
              handleChange(setEducation, index, "startDate", e.target.value)
            }
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="End Year"
            value={edu.endDate}
            onChange={(e) =>
              handleChange(setEducation, index, "endDate", e.target.value)
            }
            margin="normal"
            variant="outlined"
          />
          <Typography variant="body1" mt={2}>
            Description:
          </Typography>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: 1,
              minHeight: 150,
              mt: 1,
            }}
          >
            <Editor
              apiKey="i8981nf1t4tgfxemqlz33mii8htybky15wy1dqzb51ho6v24"
              value={edu.description}
              onEditorChange={(newDescription) =>
                handleChange(
                  setEducation,
                  index,
                  "description",
                  newDescription
                )
              }
              init={{
                height: 150,
                menubar: false,
                plugins: "lists link",
                toolbar: "bold italic  | bullist numlist",
                readonly: false,
              }}
            />
          </Box>
          <IconButton
            onClick={() => handleRemoveSection(setEducation, index)}
            color="error"
            sx={{ mt: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {/* "Add Education" button outside of the map */}
      <Button
        onClick={() =>
          handleAddSection(setEducation, {
            institution: "",
            degree: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        variant="outlined"
        sx={{ mt: 2 }}
      >
        + Add Education
      </Button>
    </Box>
  );

      case 3:
        return (
          <TagsInput
            value={skills}
            onChange={setSkills}
            name="skills"
            placeHolder="Add skills"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}
    >
      <Grid container spacing={3} sx={{ maxWidth: 1400 }}>
        {/* Form Section */}

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              {steps[currentStep].title}
            </Typography>
            {renderFormFields()}
            <Box display="flex" justifyContent="space-between" mt={2}>
              {currentStep > 0 && (
                <Button variant="outlined" onClick={handlePrevStep}>
                  Back
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button variant="outlined" onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
                  Download Resume
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Preview Section */}
        <Grid item xs={12} md={6} >
          <Paper
            sx={{ p: 3, boxShadow: 3 }}
            className="resume-preview"
            id="resume-preview"
            
          >
            {/* Resume Preview Header */}
            <Typography variant="h5" align="center" gutterBottom>
              Resume Preview
            </Typography>

            {/* Personal Info Section */}
            <Box textAlign="center" mb={3}>
              <Typography variant="h4">{personalInfo.name}</Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", color: "gray" }}
              >
                {personalInfo.email} | {personalInfo.phone} |{" "}
                {personalInfo.address}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Work Experience Section */}
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Work Experience
            </Typography>
            {workExperience.map((exp, index) => (
              <Box key={index} mb={3}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    {exp.position}, {exp.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {exp.startDate} - {exp.endDate}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  {exp.location}
                </Typography>

                {/* Render the description */}
                <Typography
                  variant="body2"
                  component="div" // Ensures it renders a <div> instead of <p>
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(exp.description, {
                        ALLOWED_TAGS: [
                          "b",
                          "i",
                          "u",
                          "strong",
                          "em",
                          "ul",
                          "ol",
                          "li",
                          "a",
                        ],
                      }),
                    }}
                  />
                </Typography>
              </Box>
            ))}

            <Divider sx={{ mb: 3 }} />

            {/* Education Section */}
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Education
            </Typography>
            {education.map((edu, index) => (
              <Box key={index} mb={3}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    {edu.degree}, {edu.institution}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {edu.startDate} - {edu.endDate}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  {edu.location}
                </Typography>

                {/* Render the description */}
                <Typography
                  variant="body2"
                  component="div" // Ensures it renders a <div> instead of <p>
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(edu.description, {
                        ALLOWED_TAGS: [
                          "b",
                          "i",
                          "u",
                          "strong",
                          "em",
                          "ul",
                          "ol",
                          "li",
                          "a",
                        ],
                      }),
                    }}
                  />
                </Typography>
              </Box>
            ))}

            <Divider sx={{ mb: 3 }} />

            {/* Skills Section */}
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Skills
            </Typography>
            <Box>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{ m: 0.5 }}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResumeForm;









