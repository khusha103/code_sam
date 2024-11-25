const nodemailer = require('nodemailer');
require('dotenv').config(); // This loads the environment variables from the .env file

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Fetch the email address from the .env file
    pass: process.env.EMAIL_PASSWORD, // Fetch the app password from the .env file
  },
});

// Email options
const mailOptions = {
  from: process.env.EMAIL_USER, // Fetch the email address from the .env file
  to: 'khusha.ss103@gmail.com', // Replace with the recipient email address
  subject: 'Test Email from Nodemailer',
  text: 'This is a test email sent from Nodemailer!',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
