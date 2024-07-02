const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError  = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const appointments = require('../models/Appointment.model');
const messages = require('../models/Message.model');



// Add Teacher
exports.addTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, department, subject } = req.body;
  const newUser = new User({ name, email, password, department, subject, role: 'teacher' });
  await newUser.save();

  res.status(201).json(new ApiResponse(201, {newUser}, 'Teacher added successfully'));
});

// Update Teacher
exports.updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, department, subject } = req.body;

  const updatedTeacher = await User.findByIdAndUpdate(id, { name, department, subject }, { new: true });
  res.status(200).json(new ApiResponse(200, {updatedTeacher}, 'Teacher updated successfully'));
});

// Delete Teacher
exports.deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, 'Teacher deleted successfully'));
});

// Approve Registration
exports.approveStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
// Find the student by ID and role
const student = await User.findOne({ _id: id, role: 'student' }).select('-password -role -__v');
// Toggle the approved value
student.approved = !student.approved;

// Save the updated student
await student.save();
  res.status(200).json(new ApiResponse(200, {student}, `Student ${student.approved ? 'APPROVED' : 'RESTRICTED'} successfully`));
});

// View All Students
exports.viewAllStudents = asyncHandler(async (req, res) => {
  const limit = req.params.limit ? parseInt(req.params.limit) : 10;
  const page = req.params.page ? parseInt(req.params.page) : 1;
  const students = await User.find({ role: 'student' }).skip((page - 1) * limit).limit(limit);

  res.status(200).json(new ApiResponse(200, { students }, 'Students found successfully'));
});

//Delete Student
exports.deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, 'Student deleted successfully'));
});


// View All Teachers
exports.viewAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await User.find({ role: 'teacher' });
  // console .info(teachers);
  const TeacherList = teachers.map((teacher) => {
    return { id: teacher._id, name: teacher.name, 
      department: teacher.department, subject: teacher.subject
     }
  })
  res.status(200).json(new ApiResponse(200, { TeacherList }, 'Teachers found successfully'));
});

// View All Appointments
exports.viewAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointments.find();
  res.status(200).json(new ApiResponse(200, { appointments }, 'Appointments found successfully'));
})

// View All Messages
exports.viewAllMessages = asyncHandler(async (req, res) => {
  const messages = await messages.find();
  res.status(200).json(new ApiResponse(200, { messages }, 'Messages found successfully'));
})

//get all counts (total teacher, total students, total appintments, pending requests of student ,approved requests of students and pending appointments)

exports.getAllCounts = asyncHandler(
  async (req,res)=>{
const totalTeachers = await User.countDocuments({role:'teacher'});
const totalStudents = await User.countDocuments({role:'student'});
const approvedStudentRegistration = await User.countDocuments({role:'student', approved:true});
const pendingStudentRegistration = await User.countDocuments({role:'student', approved:false});


const totalAppointments = await appointments.countDocuments();

const pendingAppointments = await appointments.countDocuments({status:'Pending'});

const upcomingAppointments = await appointments.countDocuments({
  date: { $gte: new Date() },
  status: { $in: ['Approved'] }
})
const completedAppointments = await appointments.countDocuments({status:'Completed'})

const cancledAppointments = await appointments.countDocuments({status:'Canceled'})

const allCounts = {
  totalTeachers,
  totalStudents,
  approvedStudentRegistration,
  pendingStudentRegistration,
  totalAppointments,
  pendingAppointments,
  upcomingAppointments,
  completedAppointments,
  cancledAppointments
}
res.status(200).json(new ApiResponse(200, {allCounts}, 'Counts found successfully'));


  }
)

const getMonthlyData = async ()=>{

  const currentYear = new Date().getFullYear();


  const appointmentsPipeline = [
    {
      $match: {
        date: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$date' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ];
  
  const appointmentsData = await appointments.aggregate(appointmentsPipeline);
  
  const appointmentCounts = new Array(12).fill(0);
      appointmentsData.forEach(item => {
        appointmentCounts[item._id - 1] = item.count;
      });
  
      const appointmentData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
      return  appointmentData ;
}


exports.getMonthlyData =  asyncHandler(async (req, res) => {
  const appointmentData = await getMonthlyData();
  res.status(200).json(new ApiResponse(200, { appointmentData }, 'Monthly data found successfully'));
});