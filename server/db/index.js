// db.js

const mongoose = require('mongoose');
const config = require('../config/config');
const constants = require('../constants');

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.db.uri}/${constants.DB_Name}`
    );
    console.log(
      'MongoDB connected...with host:',
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
