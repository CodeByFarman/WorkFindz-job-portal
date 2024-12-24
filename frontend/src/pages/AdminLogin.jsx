import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      
      // Store token in localStorage
      localStorage.setItem('adminToken', response.data.token);

      // Navigate to admin panel
      navigate('/admin/dashboard');

      toast.success("Login successful! Redirecting...");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
        <Typography variant="h5" gutterBottom>Admin Login</Typography>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                variant="outlined"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <ToastContainer />
    </Container>
  );
};

export default AdminLogin;
