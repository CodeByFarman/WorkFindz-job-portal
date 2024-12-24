import nodemailer from 'nodemailer';

// Function to send an email
export const sendEmail = async (req, res) => {
  const { name, email, telephone, subject, message } = req.body;

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can switch to Yahoo, Outlook, etc.
      auth: {
        user: 'workfindzconsultants@gmail.com', // Your email
        pass: 'ojtu zcjz gtva egwb',    // Your app password (not regular password)
      },
    });

    // Define mail options
    const mailOptions = {
      from: email, // Sender address
      to: 'contact@workfindz.com', // Receiver's email (can be a company email)
      subject: `Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${telephone}\n\nMessage:\n${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // Send success response
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
