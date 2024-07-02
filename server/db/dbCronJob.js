const cron = require('node-cron');
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment.model'); // Adjust the path as necessary



// Schedule a task to run every 3 months
cron.schedule('0 0 1 */3 *', async () => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  try {
    const result = await Appointment.deleteMany({
      status: 'Completed',
      createdAt: { $lt: threeMonthsAgo }
    });
    console.log(`Deleted ${result.deletedCount} completed appointments older than 3 months.`);
  } catch (err) {
    console.error('Error deleting completed appointments:', err);
  }
});
