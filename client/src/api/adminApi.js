import axiosInstance from './axiosInstance';

// Add Teacher
export const addTeacher = async (teacherData) => {
  const response = await axiosInstance.post('/api/admin/teacher', teacherData);
  return response.data;
};

// Update Teacher
export const updateTeacher = async (id, teacherData) => {
  const response = await axiosInstance.put(
    `/api/admin/teacher/${id}`,
    teacherData
  );
  return response.data;
};

// Delete Teacher
export const deleteTeacher = async (id) => {
  const response = await axiosInstance.delete(`/api/admin/teacher/${id}`);
  return response.data;
};

// Approve Student
export const approveStudent = async (id) => {
  const response = await axiosInstance.put(`/api/admin/approve/${id}`);
  return response.data;
};
//Delete Student
export const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(`/api/admin/student/${id}`);
  return response.data;
};

//Get All Students
export const getAllStudents = async (page, limit) => {
  const response = await axiosInstance.get('/api/common/students', {
    params: { page, limit },
  });
  return response.data;
};

//Get All Teachers
export const getAllTeachers = async () => {
  const response = await axiosInstance.get('/api/common/teachers');
  return response.data;
};

//get counts
export const getCounts = async () => {
  const response = await axiosInstance.get('/api/common/getcounts');
  return response.data;
};

export const getMonthlyData = async () => {
  const response = await axiosInstance.get('/api/admin/getmonthlydata');
  return response.data;
};
