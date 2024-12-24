import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

const platforms = [
  {
    name: "Microsoft Resume Templates",
    url: "https://templates.office.com/en-us/resumes-and-cover-letters",
    image: "/image-300x150.jpg",
  },
  {
    name: "Canva Resume Maker",
    url: "https://www.canva.com/resumes/templates/",
    image: "/image-300x150 (3).jpg",
  },
  {
    name: "Adobe Express Resume Templates",
    url: "https://www.adobe.com/express/create/resume",
    image: "/image-300x150 (2).jpg",
  },
];

const ResumeTemplates = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/create-resume"); // Change this to the route for your ResumeForm component
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1A2B3C",
        color: "#FFFFFF",
        padding: 3,
      }}
    >
      {/* Resume Builder Button - Positioned Above the Cards */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigate}
        sx={{
          padding: "15px 30px", // Increased padding for a larger button
          fontSize: "18px", // Larger font for better visibility
          fontWeight: "bold", // Bold text for emphasis
          textTransform: "uppercase", // Makes the text more prominent
          backgroundColor: "#FF9900", // Attention-grabbing color
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow for a standout effect
          borderRadius: "8px", // Rounded corners for modern look
          "&:hover": { backgroundColor: "#cc7a00" }, // Darker hover effect
        }}
      >
        Create Your Perfect Resume with Our Resume Builder
      </Button>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          textAlign: "center",
          marginTop: 5,
          color: "white",
        }}
      >
        Discover Top Resume Templates
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          maxWidth: 600,
          marginBottom: 5,
          lineHeight: 1.8,
        }}
      >
        Create your professional resume effortlessly with these popular tools.
        Whether you're starting fresh or updating an old resume, these platforms
        offer templates to help you stand out in today's competitive job market.
      </Typography>

      {/* Grid for Responsive Layout */}
      <Grid container spacing={3} justifyContent="center">
        {platforms.map((platform, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#253545",
                color: "#FFFFFF",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: "#FF9900",
                  }}
                >
                  {index + 1}. {platform.name}
                </Typography>
                <img
                  src={platform.image}
                  alt={platform.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />
                <Button
                  variant="contained"
                  color="warning"
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: "#FF9900",
                    "&:hover": { backgroundColor: "#cc7a00" },
                  }}
                >
                  Visit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResumeTemplates;
