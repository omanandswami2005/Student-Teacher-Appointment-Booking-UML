import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestHandler } from '../../utils';
import { getAllStudents } from '../../api/adminApi';
import { getAllTeachers } from '../../api/adminApi';

const StudentDropdownSearch = ({ formData, setFormData, IsTeacher }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      await requestHandler(
        async () =>
          IsTeacher ? await getAllTeachers() : await getAllStudents(),
        null,
        (res) => {
          const { data } = res;
          setStudents(IsTeacher ? data.TeacherList : data.students);
        }
      );
    };

    fetchStudents();
  }, [IsTeacher]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStudentSelect = (studentId) => {
    // console.log(studentId);
    setFormData({
      ...formData,
      student: studentId,
    });
    setDropdownVisible(false);
    setSearchTerm('');
  };
  const handleTeachertSelect = (studentId) => {
    // console.log(studentId);
    setFormData({
      ...formData,
      teacher: studentId,
    });
    setDropdownVisible(false);
    setSearchTerm('');
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStudentName =
    students.find((student) =>
      IsTeacher
        ? student.id === formData.teacher
        : student._id === formData.student
    )?.name || `Select ${IsTeacher ? 'Teacher' : 'Student'} Name`;

  return (
    <div className="relative">
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="date"
      >
        {IsTeacher ? 'Teacher Name' : 'Student Name'}
      </label>

      <button
        id="dropdownSearchButton"
        onClick={() => setDropdownVisible(!dropdownVisible)}
        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        type="button"
      >
        {selectedStudentName}
        <svg
          className="w-2.5 h-2.5 ml-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {dropdownVisible && (
        <div
          id="dropdownSearch"
          className="absolute z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700 mt-2"
          style={{ maxHeight: '300px', overflowY: 'auto' }}
        >
          <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search student"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <ul
            className="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            {filteredStudents.map((student) => (
              <li
                key={IsTeacher ? student.id : student._id}
                onClick={() => {
                  IsTeacher
                    ? handleTeachertSelect(student.id)
                    : handleStudentSelect(student._id);
                }}
              >
                <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                  <label className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                    {student.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

StudentDropdownSearch.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  IsTeacher: PropTypes.bool.isRequired,
};

export default StudentDropdownSearch;
