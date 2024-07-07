import { useState } from 'react';
import PropTypes from 'prop-types';

import { requestHandler } from '../../utils';
import { showSuccessToast } from '../../utils/toastUtils';
import { createAppointment } from '../../api/teacherApi';
import StudentDropdownSearch from './StudentDropdownSearch';
import { createAppointmentStd } from '../../api/studentApi';

const NewAppointmentModal = ({
  isOpen,
  onClose,
  onAppointmentCreated,
  IsTeacher,
}) => {
  // console.log(IsTeacher)

  const [formData, setFormData] = useState({
    student: '',
    teacher: '',
    date: '',
    message: '',
    status: 'pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await requestHandler(
      async () =>
        IsTeacher
          ? await createAppointmentStd(formData)
          : await createAppointment(formData),
      null,
      (res) => {
        console.log(res);
        showSuccessToast(`${res.message}`);
        setFormData({
          student: '',
          teacher: '',
          date: '',
          message: '',
          status: 'Approved',
        });
        onClose();
        onAppointmentCreated();
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          New Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          <StudentDropdownSearch
            formData={formData}
            setFormData={setFormData}
            IsTeacher={IsTeacher}
          />

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-md dark:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md dark:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

NewAppointmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAppointmentCreated: PropTypes.func.isRequired,
  IsTeacher: PropTypes.bool.isRequired,
};

export default NewAppointmentModal;
