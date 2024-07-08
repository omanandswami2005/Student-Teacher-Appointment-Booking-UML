import { Link } from 'react-router-dom';
import DarkToggler from '../components/DarkToggler';
import Footer from '../components/Footer';


/**
 * Renders the landing page of the application.
 *
 * @return {JSX.Element} The rendered landing page.
 */
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
        <div className="grid  md:grid-cols-3 gap-4 justify-center text-left mx-2 mb-8 shadow-md overflow-x-auto">
          <div className="p-6">
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
          <div className="p-6">
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
          <div className="p-6">
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
          To Access <b> The Source Code, Documentation and to Contribute to the
          project </b> please visit the <b>Github page :</b>
          <br />
          <a
            href="https://github.com/ItsOmiii2005/Student-Teacher-Appointment-Booking-UML"
            className="text-blue-500 hover:text-blue-700"
          >
            View Appointment Booking System at Github
          </a>
        </div>


        <div className="bg-white shadow-md rounded-lg p-6 mx-auto mb-8 text-xl max-w-2xl dark:bg-gray-800">
  <p className="font-semibold text-lg mb-4 text-center">Credentials & Links for Login:</p>
  <div className="space-y-4">
    <div>
      <p className="font-medium">&bull;Admin:</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &#9734; Email: <span className="font-mono text-blue-600">admin@email.com</span></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &#9734; Password: <span className="font-mono text-blue-600">12345678</span></p>
    </div>
    <div>
      <p className="font-medium">&bull;Teachers:</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &#9734; Emails for teacher&apos;s login are available in the Admin Dashboard!</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &#9734; Password is the same as their respective email!</p>
    </div>
    <div>
      <p className="font-medium">&bull;Students:</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &#9734; Register With Valid Email.</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &#9734;Verify  Email.</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &#9734; Login, Use & Understand.</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &#9734; Finally.... Delete Account Using Admin Dashboard!.</p>
    </div>
  </div>
  
        <div className="flex justify-center space-x-4 mb-8 my-9">
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
</div>

        

       
      </main>
      

<hr  className="mb-8 bg-gray-200 dark:bg-gray-700"/>

<div className="flex justify-center mb-8 dark:text-gray-200">
  <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl dark:bg-gray-800">
    <ul className="list-none">
      <li className="text-2xl font-bold mb-4 text-center">
        New Learnings:
      </li>
      <ul className="list-none space-y-2">
        <li className="flex items-center">
          <span className="mr-2">✅</span>
          <span>Role Based JWT Authentication/Authorization.</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">✅</span>
          <span>Encrypted Passwords.</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">✅</span>
          <span>Email Verification (Through Link).</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">✅</span>
          <span>Logging The Actions & Requests.</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">✅</span>
          <span>Forgot/Reset Password.</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">✅</span>
          <span>Google&apos;s ReCaptcha.</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">✅</span>
          <span>Auto Expire MongoDB Documents.</span>
        </li>
      </ul>
    </ul>
  </div>
</div>

<div className="flex justify-center mb-8 dark:text-gray-200">
  <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl dark:bg-gray-800">
    <ul className="list-none">
      <li className="text-2xl font-bold mb-4 text-center">
        Conditions & Rules :
      </li>
      <li><div className="text-center mb-8 shadow-md mx-2 text-xl">
        NOTE : <p className="text-left mb-8">&bull; As This project is <b> Hosted on a free server(Render)</b> so,
        please <b> Be patient while it loads the data ⌚.</b> <br />
        &bull; Also we are using &nbsp; <b> THE FREE TIER&nbsp; </b>of <b>MongoDB ATLAS </b>for storing data,{' '}
        Therefore <b>All the data will be deleted after every 2 days🧹.</b></p>
      </div> </li>
      <ul className="list-none space-y-2">
        <li className="flex items-center">
          <span className="mr-2">⚠️</span>
          <span>Only Maximum <b> 10 Teachers </b> Can Exists In The System !<br />(4 [ Built In ] + 6 [ Can Be Added ] ) </span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">⚠️</span>
          <span>Only Max <b>20 Students</b>  Can Exists In The System !<br />(1 [ Built In ] + 19 [ Can Be Added ] )</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">⚠️</span>
          <span>Each <b> Appointment </b>Created In The System Will BE <b> Deleted After 2 Days </b>!</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2">⚠️</span>
          <span>Every Logged In Session Will BE <b> Expired (Auto Log Out) After 2 Hours</b> !</span>
        </li>
       
        <li className="flex items-center">
          <span className="mr-2">⚠️</span>
          <span>And Finally...  <br /> All The Data Will Be Deleted After Every 2 Days🧹.</span>
        </li>
      </ul>
    </ul>
  </div>
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
