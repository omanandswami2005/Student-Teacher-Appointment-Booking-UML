import { useEffect, useState } from 'react';
import { requestHandler } from '../../utils';
import { getAllAppointments } from '../../api/studentApi';
import NewAppointmentModal from '../teacher/NewAppointmentModal';
import { Button } from 'flowbite-react';
import PropType from 'prop-types';

const statusOptions = ['Pending', 'Approved', 'Canceled', 'Completed'];
/**
 * Renders a list of appointments for a student or teacher.
 * @param {boolean} IsTeacher - Indicates if the current user is a teacher.
 * @returns {JSX.Element} - The rendered component.
 */
const AppointmentsListForStudent = ({ IsTeacher }) => {
  /**
   * State holding the list of appointments.
   * @type {Array}
   */
  const [appointments, setAppointments] = useState([]);

  /**
   * State indicating if the new appointment modal is open.
   * @type {boolean}
   */
  const [newAppointmentModal, setNewAppointmentModal] = useState(false);

  /**
   * State holding the search term for filtering appointments.
   * @type {string}
   */
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * State holding the status filter for filtering appointments.
   * @type {string}
   */
  const [statusFilter, setStatusFilter] = useState('');

  /**
   * Fetches all appointments from the API on component mount.
   */
  useEffect(() => {
    fetchAppointments();
  }, []);

  /**
   * Opens the new appointment modal.
   */
  const openNewAppointmentModal = () => {
    setNewAppointmentModal(true);
  };

  /**
   * Fetches all appointments from the API after an appointment is created.
   */
  const onAppointmentCreated = () => {
    fetchAppointments();
  };

  /**
   * Fetches all appointments from the API.
   */
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

  /**
   * Handles the search input change event.
   * @param {Event} e - The input change event.
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Handles the status filter change event.
   * @param {Event} e - The input change event.
   */
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  /**
   * Filters the appointments based on the search term and status filter.
   * @type {Array}
   */
  const filteredAppointments = appointments.filter((appointment) =>
    !IsTeacher
      ? appointment.student.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (statusFilter === '' || appointment.status === statusFilter)
      : appointment.teacher.name
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
            placeholder={
              !IsTeacher ? 'Search by student name' : 'Search by teacher name'
            }
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
                <th className="py-2 px-4 border-b">
                  {!IsTeacher ? 'Student Name' : 'Teacher Name'}
                </th>
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
                    {!IsTeacher
                      ? appointment.student.name
                      : appointment.teacher.name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(appointment.date)
                      .toISOString()
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('-')}
                  </td>
                  <td className="py-2 px-4 border-b">{appointment.status}</td>
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

AppointmentsListForStudent.propTypes = {
  IsTeacher: PropType.bool.isRequired,
};

export default AppointmentsListForStudent;
