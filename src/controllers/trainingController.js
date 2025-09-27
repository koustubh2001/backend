// controllers/contactController.js
const Contact = require('../models/training');

exports.submitContact = async (req, res) => {
  try {
    const { name, phone, email, training, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newContact = new Contact({
      name,
      phone,
      email,
      training,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: 'Message saved successfully!', data: newContact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
