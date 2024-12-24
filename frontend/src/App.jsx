import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Preloader from './components/PreLoader';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/About';
import ContactUs from './pages/ContactUs';
import BlogList from './pages/BlogList';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminPanel from './pages/Adminpanel';
import AdminLogin from './pages/AdminLogin';
import ResumeTemplates from './pages/ResumeTemplates';
import ResumeForm from './components/ResumeForm'; // Import the Resume Form Page
import './index.css';


function Layout({ children }) {

  return (
    <div className="site-wrapper">
      <Preloader />
      <div className="main-header">
        <div className="container">
          <Header />
          <ToastContainer position="top-right" />
        </div>
      </div>
      
      {children}
      
      <div className="main-footer">
        <div className="container">
          <Footer />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true  }} >
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path='/joblist' element={<Layout><JobList /></Layout>} />
        <Route path="/job/:jobId" element={<Layout><JobDetails /></Layout>} /> {/* Job details page */}
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/resume-templates" element={<Layout><ResumeTemplates /></Layout>} />
        <Route path='/contact' element={<Layout><ContactUs /></Layout>} />
        <Route path='/blog' element={<Layout><BlogList /></Layout>} />
        <Route path='/blogs/:id' element={<Layout><BlogList /></Layout>} />

        {/* New Routes for Signup and Login */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Panel Route */}
        <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin login route */}
        <Route path="/admin/dashboard" element={<AdminPanel />} /> {/* Admin panel route */}
        
        {/* Resume Form Route */}
        <Route path="/create-resume" element={<Layout><ResumeForm /></Layout>} /> {/* Resume form page */}
      </Routes>

      {/* Place ToastContainer here for global toast notifications */}
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
