import { useEffect, useState } from 'react';
import { requestHandler } from '../../utils';
import { showSuccessToast } from '../../utils/toastUtils';
import {
  getAllAppointments,
  updateAppointmentStatus,
} from '../../api/teacherApi';
import NewAppointmentModal from './NewAppointmentModal';
import { Button } from 'flowbite-react';
import PropType from 'prop-types';

const statusOptions = ['Pending', 'Approved', 'Canceled', 'Completed'];

const AppointmentsList = ({ IsTeacher }) => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointmentModal, setNewAppointmentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const openNewAppointmentModal = () => {
    setNewAppointmentModal(true);
  };

  const onAppointmentCreated = () => {
    fetchAppointments();
  };

  const fetchAppointments = async () => {
    await requestHandler(
      async () => await getAllAppointments(),
      null,
      (res) => {
        const { data } = res;
        setAppointments(data.appointments);
      }
    );
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    await requestHandler(
      async () => await updateAppointmentStatus(appointmentId, newStatus),
      null,
      (res) => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
        showSuccessToast(res.message);
      }
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
  console.log(appointments);
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || appointment.status === statusFilter)
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <Button
        onClick={openNewAppointmentModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-500 mx-2 mt-2"
      >
        Create New Appointment
      </Button>

      <div className="flex flex-col overflow-x-auto mx-2">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by student name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border rounded-md  dark:bg-gray-700 dark:text-white"
          />
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="p-2 border mx-3  rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Appointments</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {filteredAppointments.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-md dark:bg-gray-800 border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Sr. No</th>
                <th className="py-2 px-4 border-b">Student</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Appointment Status</th>
                <th className="py-2 px-4 border-b">Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    {appointment.student.name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(appointment.date)
                      .toISOString()
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('-')}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(appointment._id, e.target.value)
                      }
                      className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b w-1/4">
                    <div className="whitespace-normal break-words">
                      {appointment.message}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Appointments!</div>
        )}
      </div>
      <NewAppointmentModal
        isOpen={newAppointmentModal}
        onClose={() => setNewAppointmentModal(false)}
        onAppointmentCreated={onAppointmentCreated}
        IsTeacher={IsTeacher}
      />
    </div>
  );
};

AppointmentsList.propTypes = {
  IsTeacher: PropType.bool.isRequired,
};

export default AppointmentsList;
