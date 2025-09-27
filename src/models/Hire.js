const mongoose = require('mongoose');
     const hireSchema = new mongoose.Schema({
       fullName: { type: String, required: true },
       email: { type: String, required: true },
       mobile: { type: String, required: true },
       company: { type: String },
       message: { type: String },
       createdAt: { type: Date, default: Date.now }
     });
     module.exports = mongoose.model('Hire', hireSchema);