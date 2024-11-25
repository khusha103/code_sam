// // const express = require('express');
// // const { registerUser, verifyOtp } = require('../controllers/authController');

// // const router = express.Router();

// // router.post('/register', registerUser);
// // router.post('/verify-otp', verifyOtp);

// // module.exports = router;

// //authRoutes.js
// const express = require('express');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// const router = express.Router();


// // Register endpoint
// router.post('/register', async (req, res) => {
//   try {
//     console.log('Registration attempt with payload:', {
//       ...req.body,
//       password: '[HIDDEN]', // Hide password in logs for security
//       confirmPassword: '[HIDDEN]'
//     });

//     const { role, email, password } = req.body;

//     // Validate required fields
//     if (!role || !email || !password) {
//       console.log('Missing required fields:', { 
//         hasRole: !!role, 
//         hasEmail: !!email, 
//         hasPassword: !!password 
//       });
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Log pre-hash step
//     console.log('Attempting to hash password...');
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log('Password hashed successfully');

//     // Log user creation attempt
//     console.log('Creating new user with email:', email, 'and role:', role);
//     const newUser = new User({
//       role,
//       email,
//       password: hashedPassword,
//     });

//     // Validate user object before saving
//     console.log('User object before save:', {
//       role: newUser.role,
//       email: newUser.email,
//       hasPassword: !!newUser.password
//     });

//     // Save to the database
//     console.log('Attempting to save user to database...');
//     const savedUser = await newUser.save();
//     console.log('User saved successfully with ID:', savedUser._id);

//     res.status(201).json({ 
//       message: 'User registered successfully!'
//        });
    

//   } catch (error) {
//     console.error('Registration error details:', {
//       errorName: error.name,
//       errorMessage: error.message,
//       errorCode: error.code,
//       fullError: error
//     });

//     if (error.code === 11000) {
//       console.log('Duplicate email detected:', error.keyValue);
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     // Check for validation errors
//     if (error.name === 'ValidationError') {
//       console.log('Validation error:', error.errors);
//       return res.status(400).json({ 
//         error: 'Validation error', 
//         details: Object.values(error.errors).map(err => err.message)
//       });
//     }

//     console.error('Unhandled error during registration:', error);
//     res.status(500).json({ 
//       error: 'An error occurred during registration',
//       details: error.message // Include error message in response during development
//     });
//   }
// });


// // Login endpoint
// router.post('/login', async (req, res) => {
//   try {
//     console.log('Login attempt for:', {
//       email: req.body.email,
//       hasPassword: !!req.body.password
//     });

//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ 
//         error: 'Please provide both email and password' 
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     console.log('User found:', !!user);

//     // If user doesn't exist
//     if (!user) {
//       return res.status(401).json({ 
//         error: 'Invalid email or password' 
//       });
//     }

//     // Compare password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log('Password validation:', isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(401).json({ 
//         error: 'Invalid email or password' 
//       });
//     }

//     // Create user data to send back (excluding password)
//     const userData = {
//       id: user._id,
//       email: user.email,
//       role: user.role
//     };

//     res.status(200).json({
//       message: 'Login successful',
//       user: userData
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ 
//       error: 'An error occurred during login',
//       details: error.message 
//     });
//   }
// });

// module.exports = router;





const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register endpoint
router.post('/register', registerUser);

// Login endpoint
router.post('/login', loginUser);

module.exports = router;
