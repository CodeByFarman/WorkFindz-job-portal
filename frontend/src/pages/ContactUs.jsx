import React, { useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    subject: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


      // Check if all required fields are filled
      if (!formData.name || !formData.email || !formData.telephone || !formData.subject || !formData.message) {
        toast.error("Please fill in all the required fields.");
        return;
      }
  
      try {
        // Send form data to the backend API
        const response = await axios.post('http://localhost:5000/api/send-email', formData);
  
        // Show success notification
        toast.success(response.data.message || "Your message has been sent successfully!");
  
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          telephone: '',
          subject: '',
          message: ''
        });
  
      } catch (error) {
        console.error("Error submitting form:", error);
        // Show error notification
        toast.error(error.response?.data?.error || "There was an error sending your message. Please try again.");
      }
  };
  
  return (
    <main className="main">

      <div className="container">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <section className="mb-50">
              <div className="row">
                <div className="col-xl-9 col-md-12 mx-auto">
                  <div className="contact-from-area padding-20-row-col">
                    <h2 className="section-title mt-15 mb-10 text-center">
                      Drop Us a Line
                    </h2>
                    <p className="text-muted mb-30 font-md text-center">
                      Your email address will not be published.
                    </p>
                    <form
                      className="contact-form-style mt-80"
                      id="contact-form"
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="input-style mb-20">
                            <input
                              name="name"
                              placeholder="First Name"
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-style mb-20">
                            <input
                              name="email"
                              placeholder="Your Email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-style mb-20">
                            <input
                              name="telephone"
                              placeholder="Your Phone"
                              type="tel"
                              value={formData.telephone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-style mb-20">
                            <input
                              name="subject"
                              placeholder="Subject"
                              type="text"
                              value={formData.subject}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 text-center">
                          <div className="textarea-style mb-30">
                            <textarea
                              name="message"
                              placeholder="Message"
                              value={formData.message}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <button className="submit submit-auto-width" type="submit">
                            Send message
                          </button>
                        </div>
                      </div>
                    </form>
                    <p className="form-message"></p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
