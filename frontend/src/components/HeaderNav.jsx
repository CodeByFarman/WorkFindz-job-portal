import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom"; // Alias for react-router-dom Link
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import axios from "axios"; // For HTTP requests

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/validate-session",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const toggleMobileMenu = (open) => () => {
    setIsMobileMenuOpen(open);
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/api/v1/user/logout", {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        window.location.reload(); // Optional: Reload the page
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Find Job", link: "/JobList" },
    { text: "About Us", link: "/About" },
    { text: "Resume Builder", link: "/resume-templates" },
    { text: "Blogs", link: "/Blog" },
    { text: "Contact Us", link: "/Contact" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#333" }}>
      <Toolbar>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <RouterLink to="/" style={{ textDecoration: "none" }}> {/* Use React Router Link */}
          {/* <img
            src="w-removebg-preview.png"
            alt="WorkFindz"
            style={{
              height: "210px",
              width: "210px",
              marginRight: "10px",
              objectFit: "contain",
            }}
          /> */}
           <img
      src="w-removebg-preview.png"
      alt="WorkFindz"
      style={{
        maxHeight: "50px", // Restrict the height of the logo
        maxWidth: "150px", // Optional: Restrict width to avoid scaling issues
        objectFit: "contain", // Ensures image scales proportionally
        marginRight: "20px",
      }}
    />
          </RouterLink >
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {menuItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              underline="none"
              sx={{
                margin: "0 15px",
                fontSize: "16px",
                fontWeight: "500",
                color: "#333",
                "&:hover": { color: "#1976d2" },
              }}
            >
              {item.text}
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link
              href="/login"
              underline="none"
              sx={{
                margin: "0 15px",
                fontSize: "16px",
                fontWeight: "500",
                color: "#333",
                "&:hover": { color: "#1976d2" },
              }}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                margin: "0 15px",
                fontSize: "16px",
                fontWeight: "500",
                color: "#333",
                background: "none",
                border: "none",
                cursor: "pointer",
                "&:hover": { color: "#1976d2" },
              }}
            >
              Logout
            </button>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleMobileMenu(true)}
        >
          <Menu />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={toggleMobileMenu(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} component="a" href={item.link}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          {/* Login/Logout in the Drawer */}
          <Box
            sx={{
              padding: "10px 20px",
              borderTop: "1px solid #ccc",
              textAlign: "center",
            }}
          >
            {!isLoggedIn ? (
              <Link
                href="/login"
                underline="none"
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#333",
                  "&:hover": { color: "#1976d2" },
                }}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#333",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  "&:hover": { color: "#1976d2" },
                }}
              >
                Logout
              </button>
            )}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
