const express = require('express');
const router = express.Router();
const Hire = require('../models/Hire'); // Path must be correct

// POST /api/hire
router.post('/hire', async (req, res) => {
  try {
    const { fullName, email, mobile, company, message } = req.body;
    if (!fullName || !email || !mobile)
      return res.status(400).json({ error: 'Full Name, Email and Mobile are required.' });

    const newHire = new Hire({ fullName, email, mobile, company, message });
    await newHire.save();

    res.status(201).json({ message: 'Hire request submitted successfully', data: newHire });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all hire data
router.get('/hire', async (req, res) => {
  try {
    const hires = await Hire.find(); // Hire model must exist
    res.json(hires);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE hire by ID
router.delete('/hire/:id', async (req, res) => {
  try {
    await Hire.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
