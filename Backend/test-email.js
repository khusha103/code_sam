// test-email.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmailConfig = async () => {
  // Debug: Check environment variables
  console.log('Environment Variables Check:');
  console.log('EMAIL_USER length:', process.env.EMAIL_USER?.length || 0);
  console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD?.length || 0);
  
  // Remove any accidental spaces from the password
  const cleanPassword = process.env.EMAIL_PASSWORD?.replace(/\s+/g, '');
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER?.trim(),
      pass: cleanPassword
    },
    debug: true
  });

  try {
    console.log('\nAttempting to verify connection...');
    await transporter.verify();
    console.log('Connection verified successfully!');

    console.log('\nAttempting to send test email...');
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Test Email Configuration",
      text: "This is a test email to verify the configuration."
    });

    console.log('Email sent successfully!', info.messageId);
  } catch (error) {
    console.error('\nError Details:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Command:', error.command);
    console.error('Response:', error.response);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('\nEnvironment variables are missing!');
      console.error('Please check your .env file exists and contains:');
      console.error('EMAIL_USER=your.email@gmail.com');
      console.error('EMAIL_PASSWORD=yoursixteendigitpassword');
    }
  }
};

testEmailConfig();