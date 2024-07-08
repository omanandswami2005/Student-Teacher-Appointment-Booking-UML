import axiosInstance from './axiosInstance';

/**
 * Fetch all appointments for a teacher.
 *
 * @async
 * @function getAllAppointments
 * @returns {Promise<Object>} The response data containing all appointments.
 * @throws Will throw an error if the request fails.
 */
export const getAllAppointments = async () => {
  const response = await axiosInstance.get('/api/teacher/appointments');
  return response.data;
};

/**
 * Create a new appointment for a teacher.
 *
 * @async
 * @function createAppointment
 * @param {Object} data - The data for the new appointment.
 * @param {string} data.student - The student ID.
 * @param {string} data.teacher - The teacher ID.
 * @param {Date} data.date - The date of the appointment.
 * @param {string} [data.message] - Optional message for the appointment.
 * @returns {Promise<Object>} The response data containing the created appointment.
 * @throws Will throw an error if the request fails.
 */
export const createAppointment = async (data) => {
  const response = await axiosInstance.post('/api/teacher/appointments', data);
  return response.data;
};

/**
 * Update the status of an appointment.
 *
 * @async
 * @function updateAppointmentStatus
 * @param {string} id - The ID of the appointment to update.
 * @param {Object} data - The new status data for the appointment.
 * @param {string} data.status - The new status of the appointment.
 * @returns {Promise<Object>} The response data containing the updated appointment.
 * @throws Will throw an error if the request fails.
 */
export const updateAppointmentStatus = async (id, data) => {
  console.log(data, id);
  const response = await axiosInstance.put(`/api/teacher/appointments/${id}`, { data });
  return response.data;
};
