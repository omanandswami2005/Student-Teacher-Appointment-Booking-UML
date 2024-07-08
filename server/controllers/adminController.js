const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const appointments = require('../models/Appointment.model');
const bcrypt = require('bcrypt');

const constantTeachers = [
  '668ac01fbf498dba5c703408',
  '668ac03ebf498dba5c70340c',
  '668ac06abf498dba5c703410',
  '668ac090bf498dba5c703414',
];

/**
 * Add a new teacher to the system.
 * Limits the number of teachers to 10.
 * Hashes the password before saving.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the teacher quota has been reached.
 */
exports.addTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, department, subject } = req.body;

  // Limit the number of teachers
  const teachers = await User.countDocuments({ role: 'teacher' });
  if (teachers >= 10) {
    throw new ApiError(400, 'Sorry, The Teacher Quota has been reached :(');
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    department,
    subject,
    role: 'teacher',
    approved: true,
    isVerified: true,
  });
  await newUser.save();

  res
    .status(201)
    .json(new ApiResponse(201, { newUser }, 'Teacher added successfully !'));
});

/**
 * Update an existing teacher's information.
 * Prevents updates to constant teachers.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the teacher cannot be updated.
 */
exports.updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, department, subject } = req.body;

  if (constantTeachers.includes(id)) {
    throw new ApiError(400, 'This Teacher Cannot Be Updated !');
  }

  const updatedTeacher = await User.findByIdAndUpdate(
    id,
    { name, department, subject },
    { new: true }
  );
  res
    .status(200)
    .json(
      new ApiResponse(200, { updatedTeacher }, 'Teacher updated successfully')
    );
});

/**
 * Delete an existing teacher.
 * Prevents deletion of constant teachers.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the teacher cannot be deleted.
 */
exports.deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (constantTeachers.includes(id)) {
    throw new ApiError(400, 'This Teacher Cannot Be Deleted !');
  }

  await User.findByIdAndDelete(id);
  res
    .status(200)
    .json(new ApiResponse(200, null, 'Teacher deleted successfully'));
});

/**
 * Approve or restrict a student's registration.
 * Toggles the approved status of a student.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the student cannot be restricted.
 */
exports.approveStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id === '668abc8e8b7083333d78e3e4') {
    throw new ApiError(400, 'This Student Cannot Be Restricted !');
  }

  // Find the student by ID and role
  const student = await User.findOne({ _id: id, role: 'student' }).select(
    '-password -role -__v'
  );
  // Toggle the approved value
  student.approved = !student.approved;

  // Save the updated student
  await student.save();
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { student },
        `Student ${student.approved ? 'APPROVED' : 'RESTRICTED'} successfully`
      )
    );
});

/**
 * View all students with pagination.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.viewAllStudents = asyncHandler(async (req, res) => {
  const limit = req.params.limit ? parseInt(req.params.limit) : 10;
  const page = req.params.page ? parseInt(req.params.page) : 1;
  const students = await User.find({ role: 'student' })
    .skip((page - 1) * limit)
    .limit(limit);

  res
    .status(200)
    .json(new ApiResponse(200, { students }, 'Students found successfully'));
});

/**
 * Delete an existing student.
 * Prevents deletion of a specific student.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the student cannot be deleted.
 */
exports.deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id == '668abc8e8b7083333d78e3e4') {
    throw new ApiError(400, 'This Student Cannot Be Deleted !');
  }
  await User.findByIdAndDelete(id);
  res
    .status(200)
    .json(new ApiResponse(200, null, 'Student deleted successfully'));
});

/**
 * View all teachers.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.viewAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await User.find({ role: 'teacher' });
  // console .info(teachers);
  const TeacherList = teachers.map((teacher) => {
    return {
      id: teacher._id,
      name: teacher.name,
      department: teacher.department,
      subject: teacher.subject,
      email: teacher.email,
    };
  });
  res
    .status(200)
    .json(new ApiResponse(200, { TeacherList }, 'Teachers found successfully'));
});

/**
 * View all appointments.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.viewAllAppointments = asyncHandler(async (req, res) => {
  const appointmentsList = await appointments.find();
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { appointments: appointmentsList },
        'Appointments found successfully'
      )
    );
});

/**
 * Get counts of various entities and statuses in the system.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getAllCounts = asyncHandler(async (req, res) => {
  const totalTeachers = await User.countDocuments({ role: 'teacher' });
  const totalStudents = await User.countDocuments({ role: 'student' });
  const approvedStudentRegistration = await User.countDocuments({
    role: 'student',
    approved: true,
  });
  const pendingStudentRegistration = await User.countDocuments({
    role: 'student',
    approved: false,
  });

  const totalAppointments = await appointments.countDocuments();

  const pendingAppointments = await appointments.countDocuments({
    status: 'Pending',
  });

  const upcomingAppointments = await appointments.countDocuments({
    date: { $gte: new Date() },
    status: { $in: ['Approved'] },
  });
  const completedAppointments = await appointments.countDocuments({
    status: 'Completed',
  });

  const canceledAppointments = await appointments.countDocuments({
    status: 'Canceled',
  });

  const allCounts = {
    totalTeachers,
    totalStudents,
    approvedStudentRegistration,
    pendingStudentRegistration,
    totalAppointments,
    pendingAppointments,
    upcomingAppointments,
    completedAppointments,
    canceledAppointments,
  };
  res
    .status(200)
    .json(new ApiResponse(200, { allCounts }, 'Counts found successfully'));
});

/**
 * Get monthly data for appointments.
 *
 * @returns {Object} Monthly data for appointments.
 */
const getMonthlyData = async () => {
  const currentYear = new Date().getFullYear();

  const appointmentsPipeline = [
    {
      $match: {
        date: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$date' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];

  const appointmentsData = await appointments.aggregate(appointmentsPipeline);

  const appointmentCounts = new Array(12).fill(0);
  appointmentsData.forEach((item) => {
    appointmentCounts[item._id - 1] = item.count;
  });

  const appointmentData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Appointments',
        data: appointmentCounts,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  return appointmentData;
};

/**
 * Get monthly data for appointments and respond with it.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getMonthlyData = asyncHandler(async (req, res) => {
  const appointmentData = await getMonthlyData();
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { appointmentData },
        'Monthly data found successfully'
      )
    );
});
