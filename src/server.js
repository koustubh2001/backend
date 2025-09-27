const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const hireRoutes = require('./routes/hireRoutes');
const adminRoutes = require('./routes/adminRoutes');
const trainingRoutes = require('./routes/trainingRoutes')
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
 // Allow cross-origin requests from your Angular app

app.use('/api', trainingRoutes);
app.use('/api', hireRoutes);       // ✅ This is for POST /api/hire
app.use('/api', contactRoutes);

// Replace with your MongoDB connection string
const mongoUri = 'mongodb+srv://koustubhrayamane2001_db_user:k3gKfmZjTjG9MlkF@cluster0.jg5duzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the schema for the contact form data
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String, 
//     required: false,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model('User', userSchema);

// // API route to handle contact form submissions
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, phone, email, message } = req.body;

//     // Validate the incoming data
//     if (!name || !email || !message) {
//       return res.status(400).json({ error: 'Name, email, and message are required.' });
//     }

//     // Create a new user document
//     const newUser = new User({
//       name,
//       phone,
//       email,
//       message,
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ message: 'Message saved successfully!', data: newUser });
//   } catch (error) {
//     console.error('Error saving message:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// const path = require('path');

// // Serve Angular build
// app.use(express.static(path.join(__dirname, 'dist/your-app-name')));

// // Handle Angular routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/your-app-name/index.html'));
// });
