const mongoose = require('mongoose');

// For Indian timezone date
const getIndianTime = () => {
  const now = new Date();
  const offset = 5.5 * 60; // IST offset in minutes
  return new Date(now.getTime() + offset * 60 * 1000);
};

const userSchema = new mongoose.Schema({
  mobile_number: { type: String },
  otp: { type: String },
  otpExpiry: { type: Date },
 
  currentSessionToken: { type: String, default: null },

  // New Fields
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'vendor'],
    default: 'user'
  },

  date: {
    type: Date,
    default: getIndianTime
  }
}, {
  versionKey: false // This removes the __v field
});

module.exports = mongoose.model('User', userSchema);
