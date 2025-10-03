const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const hireRoutes = require('./routes/hireRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const trainingRoutes = require('./routes/trainingRoutes')
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://frontend-navy-ten-72.vercel.app',
  methods: ['GET','POST','DELETE','PUT'],
  credentials: true
}));
app.use(express.json());
 // Allow cross-origin requests from your Angular app

app.use('/api', trainingRoutes);
app.use('/api', hireRoutes);      
app.use('/api', contactRoutes);

 
const mongoUri = 'mongodb+srv://koustubhrayamane2001_db_user:k3gKfmZjTjG9MlkF@cluster0.jg5duzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

 
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

 


 
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

 
