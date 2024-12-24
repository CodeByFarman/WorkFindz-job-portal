import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Container,
  Paper,
  CssBaseline,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import JobManagement from '../components/JobManagement';
import PostJob from '../components/PostJob';
import ViewUsers from '../components/ViewUsers';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS styles for toast
import { useNavigate } from 'react-router-dom';  // Import useNavigate

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50',
    },
    background: {
      default: '#f0f2f5',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Styled components
const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const Navbar = styled(Box)(({ theme }) => ({
  height: 60,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const SidebarListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    fontWeight: 600,
  },
}));

const AdminPanel = () => {
  const navigate = useNavigate();  // Hook for navigation
  const [selectedView, setSelectedView] = useState('welcome');
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);

  // Check if the token exists in localStorage, if not, redirect to login
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login'); // Redirect to login if no token
    }
  }, [navigate]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/job/get');
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/get');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchJobs();
    fetchUsers();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove token from localStorage
    navigate('/admin/login'); // Redirect to login page
  };

  // Render different views
  const renderSelectedView = () => {
    switch (selectedView) {
      case 'viewJobs':
        return (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <JobManagement jobs={jobs} setJobs={setJobs} />
          </Paper>
        );
      case 'viewUsers':
        return (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <ViewUsers users={users} />
          </Paper>
        );
      case 'postJob':
        return (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <PostJob setJobs={setJobs} />
          </Paper>
        );
      case 'dashboard':
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            textAlign="center"
          >
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Dashboard Overview
            </Typography>
          </Box>
        );
      case 'welcome':
      default:
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            textAlign="center"
          >
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Welcome to the Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Select an option from the sidebar to get started
            </Typography>
          </Box>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar Drawer */}
        <DrawerContainer variant="permanent" anchor="left">
          <List sx={{ mt: 7 }}>
            <SidebarListItem
              button
              selected={selectedView === 'dashboard'}
              onClick={() => setSelectedView('dashboard')}
            >
              <DashboardIcon sx={{ mr: 2 }} />
              <ListItemText primary="Dashboard" />
            </SidebarListItem>
            <SidebarListItem
              button
              selected={selectedView === 'viewJobs'}
              onClick={() => setSelectedView('viewJobs')}
            >
              <WorkIcon sx={{ mr: 2 }} />
              <ListItemText primary="View Jobs" />
            </SidebarListItem>
            <SidebarListItem
              button
              selected={selectedView === 'viewUsers'}
              onClick={() => setSelectedView('viewUsers')}
            >
              <PersonIcon sx={{ mr: 2 }} />
              <ListItemText primary="View Users" />
            </SidebarListItem>
            <SidebarListItem
              button
              selected={selectedView === 'postJob'}
              onClick={() => setSelectedView('postJob')}
            >
              <AddIcon sx={{ mr: 2 }} />
              <ListItemText primary="Post a Job" />
            </SidebarListItem>
          </List>
        </DrawerContainer>

        {/* Content Area */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Navbar */}
          <Navbar>
            <Typography variant="h6">Welcome, Admin</Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ position: 'absolute', right: 16 }}
            >
              Logout
            </Button>
          </Navbar>

          <ContentArea>
            <Container maxWidth="lg">{renderSelectedView()}</Container>
          </ContentArea>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel;
