/**
 * Mongoose schema for the User model.
 *
 * @typedef {Object} UserSchema
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user. Must be unique.
 * @property {string} password - The password of the user.
 * @property {string} role - The role of the user. Can be 'student', 'teacher', or 'admin'.
 * @property {string} department - The department of the user (applicable for teachers).
 * @property {string} subject - The subject of the user (applicable for teachers).
 * @property {boolean} approved - Whether the user's registration is approved.
 * @property {boolean} isVerified - Whether the user's email is verified.
 * @property {string} verificationToken - The token used for email verification.
 * @property {Date} verificationTokenExpiry - The expiry time for the verification token.
 * @property {string} resetPasswordToken - The token used for password reset.
 * @property {Date} resetPasswordExpiry - The expiry time for the reset password token.
 * @property {Date} expireAt - The time after which the user document is automatically removed.
 * @property {Date} createdAt - The time when the user document was created.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
  },
  department: {
    type: String,
  },
  subject: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiry: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiry: {
    type: Date,
  },
  expireAt: {
    type: Date,
    expires: '2d',
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Check if the provided password matches the stored password for the user.
 *
 * @param {string} password - The password to compare.
 * @returns {Promise<boolean>} Returns a promise that resolves to true if the provided password matches the stored password, false otherwise.
 */
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
