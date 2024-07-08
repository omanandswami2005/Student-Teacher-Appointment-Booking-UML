import axiosInstance from '../api/axiosInstance';

/**
 * Adds a new teacher to the server.
 *
 * @param {Object} teacherData - The data of the teacher to be added.
 * @return {Promise<Object>} The response data containing the added teacher.
 */
export const addTeacher = async (teacherData) => {
  const response = await axiosInstance.post('/api/admin/teacher', teacherData);
  return response.data;
};

/**
 * Updates a teacher on the server.
 *
 * @param {string} id - The ID of the teacher to be updated.
 * @param {Object} teacherData - The updated data of the teacher.
 * @return {Promise<Object>} The response data containing the updated teacher.
 */
export const updateTeacher = async (id, teacherData) => {
  const response = await axiosInstance.put(
    `/api/admin/teacher/${id}`,
    teacherData
  );
  return response.data;
};

/**
 * Deletes a teacher from the server.
 *
 * @param {string} id - The ID of the teacher to be deleted.
 * @return {Promise<Object>} The response data containing the result of the deletion.
 */
export const deleteTeacher = async (id) => {
  const response = await axiosInstance.delete(`/api/admin/teacher/${id}`);
  return response.data;
};

/**
 * Approves a student on the server.
 *
 * @param {string} id - The ID of the student to be approved.
 * @return {Promise<Object>} The response data containing the result of the approval.
 */
export const approveStudent = async (id) => {
  const response = await axiosInstance.put(`/api/admin/approve/${id}`);
  return response.data;
};

/**
 * Deletes a student from the server.
 *
 * @param {string} id - The ID of the student to be deleted.
 * @return {Promise<Object>} The response data containing the result of the deletion.
 */
export const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(`/api/admin/student/${id}`);
  return response.data;
};

/**
 * Retrieves all students from the server.
 *
 * @param {number} page - The page number of the students.
 * @param {number} limit - The maximum number of students to retrieve.
 * @return {Promise<Object>} The response data containing the students.
 */
export const getAllStudents = async (page, limit) => {
  const response = await axiosInstance.get('/api/common/students', {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Retrieves all teachers from the server.
 *
 * @return {Promise<Object>} The response data containing the teachers.
 */
export const getAllTeachers = async () => {
  const response = await axiosInstance.get('/api/common/teachers');
  return response.data;
};

/**
 * Retrieves the counts of teachers and students from the server.
 *
 * @return {Promise<Object>} The response data containing the counts.
 */
export const getCounts = async () => {
  const response = await axiosInstance.get('/api/common/getcounts');
  return response.data;
};

/**
 * Retrieves monthly data from the server.
 *
 * @return {Promise<Object>} The response data containing the monthly data.
 */
export const getMonthlyData = async () => {
  const response = await axiosInstance.get('/api/admin/getmonthlydata');
  return response.data;
};