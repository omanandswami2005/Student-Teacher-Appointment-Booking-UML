const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'teacher', 'admin'] },
  department: String, // applicable for teachers
  subject: String, // applicable for teachers
  approved: { type: Boolean, default: false }, // for registration approval
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
  expireAt: { type: Date, expires: `2d`, default: Date.now() },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
