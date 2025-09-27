const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema
const trainingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  training: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Training = mongoose.models.Training || mongoose.model('Training', trainingSchema);

// GET all training data
router.get('/training', async (req, res) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.json(trainings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch training data' });
  }
});

// POST form submission
router.post('/training', async (req, res) => {
  try {
    const { name, email, phone, training, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newTraining = new Training({ name, email, phone, training, message });
    await newTraining.save();

    res.status(201).json({ message: 'Form submitted successfully', data: newTraining });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE training
router.delete('/training/:id', async (req, res) => {
   console.log("Delete request for ID:", req.params.id);
  try {
    const deleted = await Training.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Training not found' });
    res.json({ message: 'Training deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete training data' });
  }
});

module.exports = router;
