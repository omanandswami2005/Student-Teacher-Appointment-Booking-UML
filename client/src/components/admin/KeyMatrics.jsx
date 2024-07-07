import { useState, useEffect } from 'react';
import { requestHandler } from '../../utils';
import { getCounts } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';


const KeyMetrics = () => {
  const nav = useNavigate();
  const [counts, setCounts] = useState({});
  useEffect(() => {
    async function getCount() {
      await requestHandler(
        async () => await getCounts(),
        null,
        (res) => {
          const { data } = res;
          setCounts(data.allCounts);
        //   console.log(data);
        }
      );
    }
    getCount();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mt-5 mb-4 dark:text-gray-200">User & Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-center flex-col">
            <h3 className="text-xl font-semibold mb-4 flex justify-center dark:text-gray-200">Total Number of Teachers</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.totalTeachers}</p>
            <button 
              className="text-white bg-gradient-to-r from-purple-500 via-purple-700 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
              onClick={() => nav('/admin/teachers')}
            >
              Go To Teacher Management !
            </button>
          </div>
  
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-center flex-col">
            <h3 className="text-xl font-semibold mb-4 flex justify-center dark:text-gray-200">Total Number of Students</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.totalStudents}</p>
            <button 
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
              onClick={() => nav('/admin/students')}
            >
              Go To Student Management !
            </button>
          </div>
  
          <div className="p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">Total Approved Registrations</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.approvedStudentRegistration}</p>
          </div>
          <div className="p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">Total Pending Registrations</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.pendingStudentRegistration}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mt-5 mb-4 dark:text-gray-200">Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-200 text-center">Total Number of Appointments</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.totalAppointments}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-200 text-center">Upcoming (Approved) Appointments</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.upcomingAppointments}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-200 text-center">Pending Appointments</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.pendingAppointments}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-200 text-center">Completed Appointments</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.completedAppointments}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-200 text-center">Cancelled Appointments</h3>
            <p className="text-3xl font-bold flex justify-center dark:text-gray-200">{counts.cancledAppointments}</p>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default KeyMetrics;
