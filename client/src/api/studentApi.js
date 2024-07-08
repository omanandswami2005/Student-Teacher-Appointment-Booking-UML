import axiosInstance from './axiosInstance';

/**
 * Fetch all appointments.
 *
 * @async
 * @function getAllAppointments
 * @returns {Promise<Object>} The response data containing all appointments.
 * @throws Will throw an error if the request fails.
 */
export const getAllAppointments = async () => {
  const response = await axiosInstance.get('/api/student/appointments');
  return response.data;
};

/**
 * Create a new appointment for a student.
 *
 * @async
 * @function createAppointmentStd
 * @param {Object} data - The data for the new appointment.
 * @param {string} data.student - The student ID.
 * @param {string} data.teacher - The teacher ID.
 * @param {Date} data.date - The date of the appointment.
 * @param {string} [data.message] - Optional message for the appointment.
 * @returns {Promise<Object>} The response data containing the created appointment.
 * @throws Will throw an error if the request fails.
 */
export const createAppointmentStd = async (data) => {
  const response = await axiosInstance.post('/api/student/appointments', data);
  return response.data;
};
