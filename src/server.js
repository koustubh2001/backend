// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const hireRoutes = require('./routes/hireRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 3000;

// =====================
// CORS Configuration
// =====================
const corsOptions = {
  origin: ['https://frontend-navy-ten-72.vercel.app'], // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Preflight requests
app.options('*', cors(corsOptions));

// =====================
// Middleware
// =====================
app.use(express.json());

// =====================
// Routes
// =====================
app.use('/api', trainingRoutes);
app.use('/api', hireRoutes);
app.use('/api', contactRoutes);

// =====================
// MongoDB Connection
// =====================
const mongoUri =
  'mongodb+srv://koustubhrayamane2001_db_user:k3gKfmZjTjG9MlkF@cluster0.jg5duzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// =====================
// Start Server
// =====================
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
