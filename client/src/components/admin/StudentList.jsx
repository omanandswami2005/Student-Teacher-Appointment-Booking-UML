import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { requestHandler } from '../../utils';
import {
  getAllStudents,
  deleteStudent,
  approveStudent,
} from '../../api/adminApi';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Mock API request to fetch students
  const fetchStudents = async (page, limit) => {
    return await requestHandler(
      async () => await getAllStudents(page, limit),
      null,
      (res) => {
        const { data } = res;
        setStudents(data.students);
      }
    );
  };

  useEffect(() => {
    loadMoreStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMoreStudents = async () => {
    const newStudents = await fetchStudents(page, 10);
    if (!newStudents) return;
    setStudents((prev) => [...prev, ...newStudents]);
    if (newStudents.length < 10) {
      setHasMore(false);
    }
  };

  const handleApprove = async (id) => {
    // console.log(students);
    // setStudents(students.map(student => student._id === id ? { ...student, approved: !student.approved } : student));

    await requestHandler(
      async () => await approveStudent(id),
      null,
      (res) => {
        toast.success(res.message);
        fetchStudents();
      }
    );
  };

  const handleDelete = async (id) => {
    //confirm deletion
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student?'
    );
    if (!confirmDelete) {
      return;
    }
    await requestHandler(
      async () => await deleteStudent(id),
      null,
      (res) => {
        setStudents(students.filter((student) => student._id !== id));
        toast.success(res.message);
      }
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(filter.toLowerCase()) ||
      student.email.toLowerCase().includes(filter.toLowerCase())
  );

  const lastStudentElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className="p-6 my-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">
        Student List
      </h3>
      <input
        type="text"
        placeholder="Filter Student List !"
        className="border p-2 mb-4 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 dark:text-gray-200">Name</th>
              <th className="py-2 dark:text-gray-200">Email ID</th>
              <th className="py-2 dark:text-gray-200">Registration Status</th>
              <th className="py-2 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={student._id}
                ref={
                  index === filteredStudents.length - 1
                    ? lastStudentElementRef
                    : null
                }
                className="dark:bg-gray-900"
              >
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-200">
                  {student.name}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-200">
                  {student.email}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-200">
                  {student.approved ? 'Approved' : 'Pending...'}
                </td>
                <td className="border px-4 py-2 flex justify-center space-x-2 dark:border-gray-700">
                  <button
                    className={`${!student.approved ? 'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'}`}
                    onClick={() => handleApprove(student._id)}
                  >
                    {student.approved ? 'Restrict' : 'Approve'}
                  </button>
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default StudentList;
