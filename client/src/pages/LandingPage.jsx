import { Link } from 'react-router-dom';
import DarkToggler from '../components/DarkToggler';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-8 ">
          Welcome to <br /> 🌟The Student-Teacher Appointment Booking System 🌟
        </h1>
        <p className="text-center mb-8 shadow-md mx-2 text-xl">
          This <strong>Open Source</strong> application allows students to book
          appointments with teachers, and enables admins to manage the system
          efficiently. <br /> Also allows teachers to create & manage their
          appointments. <br />
        </p>

        <div className="flex flex-col md:flex-row justify-center text-left mx-2 mb-8 shadow-md">
          <div className="w-full md:w-1/3 p-6">
            <ul className="list-disc list-inside">
              <li>
                <strong>Admin:</strong>
                <ul className="list-disc list-inside ml-5">
                  <li>Login</li>
                  <li>Add Teacher: Name, Department, Subject.</li>
                  <li>Update/Delete Teacher</li>
                  <li>Approve Registration (Student)</li>
                  <li>View All Appointments</li>
                  <li>Statistics Charts</li>
                  <li>Logout</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 p-6">
            <ul className="list-disc list-inside">
              <li>
                <strong>Teacher:</strong>
                <ul className="list-disc list-inside ml-5">
                  <li>Login</li>
                  <li>Schedule Appointment</li>
                  <li>Approve/Cancel Appointment</li>
                  <li>View Messages</li>
                  <li>View All Appointments</li>
                  <li>Logout</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 p-6">
            <ul className="list-disc list-inside">
              <li>
                <strong>Student:</strong>
                <ul className="list-disc list-inside ml-5">
                  <li>Register</li>
                  <li>Login</li>
                  <li>Book Appointment</li>
                  <li>Search Teacher</li>
                  <li>Add Message</li>
                  <li>Logout</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mb-8 shadow-md mx-2 text-xl">
          To Access The Source Code, Documentation and to Contribute to the
          project please visit the github page :
          <br />
          <a
            href="https://github.com/ItsOmiii2005/Student-Teacher-Appointment-Booking-UML"
            className="text-blue-500 hover:text-blue-700"
          >
            View Appointment Booking System at Github
          </a>
        </div>
        <p className="text-center mb-8">Please choose an option below:</p>
        <div className="flex justify-center space-x-4 mb-8">
          <Link to="/register">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">
              Student Registration
            </button>
          </Link>
          <Link to="/login">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">
              Common Login
            </button>
          </Link>
        </div>
      </main>
      <div className="text-center mb-8 shadow-md mx-2 text-xl">
        NOTE : &bull; As This project is hosted on a free server,(Render) so,
        please be patient while it loads the data. <br />
        &bull; And we are using THE FREE TIER of MongoDB ATLAS for storing data,{' '}
        <br /> Therefore all the data will be deleted after every 2 days.
      </div>

      <div className="text-center mb-8  mx-2 text-xl">
        🫱🏼‍🫲🏼 Thank You ╰(*°▽°*)╯ For Visit !
      </div>
      <Footer />
    </div>
  );
};

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-bold">
        An Appointment Booking System By Omiii 🧑🏻‍💻
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/contact" className="hover:underline">
          Contact Me
        </Link>
        <DarkToggler />
      </div>
    </div>
  </nav>
);

export default LandingPage;
