import { useState, useEffect } from 'react';
import AddTeacherModal from './AddTeacherModal';
import UpdateTeacher from './UpdateTeacher';
import { requestHandler } from '../../utils';
import { getAllTeachers, deleteTeacher ,addTeacher, updateTeacher as e} from '../../api/adminApi';
import Navbar from '../Navbar';
import toast from 'react-hot-toast';

const initialTeachers = [
  { id: 1, name: 'Mr. Brown', department: 'Math', subject: 'Algebra' },
  { id: 2, name: 'Ms. Green', department: 'Science', subject: 'Physics' },
];

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState(initialTeachers);

  const [updateTeacher, setUpdateTeacher] = useState({});

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const setAllTeachers = async () => {
    await requestHandler(
      async () => await getAllTeachers(),
      null,
      (res) => {
        const { data } = res;
        // console.log(data);
        setTeachers(data.TeacherList);
      }
    );
  };

useEffect(() => {
  setAllTeachers();
}, []);

  const handleAdd = async (teacher) => {
    // Logic to add a new teacher
 await requestHandler(
   async () => await addTeacher(teacher),
   null,
   (res) => {
     const { data } = res;
     console.log(data);
     setAllTeachers();
     toast.success('Teacher added successfully');
   }

 )
  };

 

  const handleDelete = async (id) => {

    //confirm deletion with toast
    const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
    if (!confirmDelete) {
      return;
    }
   
     await requestHandler(
      async () => await deleteTeacher(id),
      null,
      (res) => {
       
        setAllTeachers();
        toast.success(res.message);
      }
 
      )
  };

  const handleUpdate =async (teacher) => {
    const originalTeacher = teachers.find(t => t.id === teacher.id);
  
    // Compare the original teacher data with the updated data
    if (
      originalTeacher.name === teacher.name &&
      originalTeacher.department === teacher.department &&
      originalTeacher.subject === teacher.subject
    ) {
      setIsUpdateModalOpen(false)
      toast('No changes made.');
      return;
    }

    const updatedTeachers = teachers.map(t => t.id === teacher.id ? teacher : t);
    // console.log(teacher, updatedTeachers)
   await requestHandler(
     async () => await e(teacher.id, teacher),
     null,
     (res) => {
      console.log(res);
toast.success(`${res.message}`);
      setTeachers(updatedTeachers);    
      setUpdateTeacher({});
      setIsUpdateModalOpen(false);
     }
   )
  };



  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };


  const closeUpdateModal = () => {
    setUpdateTeacher({});
    setIsUpdateModalOpen(false);
  };
  const openUpdateModal = (teacher) => {
    setUpdateTeacher(teacher);
    setIsUpdateModalOpen(true);
  };



  return (
    <>
      <div className="container mx-auto p-1">
        <Navbar title={'Teacher Management !!!'} />
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md my-3">
          <button
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded flex items-center dark:bg-blue-800 dark:hover:bg-blue-900"
            onClick={openAddModal}
          >
            <span>Add Teacher</span>
            <svg className="ml-2 w-6 h-6 text-gray-100 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
            </svg>
          </button>

          <ul>
            {teachers?.map((teacher) => (
              <li key={teacher.id} className="mb-2 flex justify-between bg-gray-50 dark:bg-gray-900 dark:text-gray-200 p-4 rounded-lg">
                <div>
                  {teacher.name} - {teacher.department} ({teacher.subject})
                </div>
                <div>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={() => openUpdateModal(teacher)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDelete(teacher.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <AddTeacherModal isOpen={isAddModalOpen} onClose={closeAddModal} onAddTeacher={handleAdd} />
          <UpdateTeacher
            isOpen={isUpdateModalOpen}
            onClose={closeUpdateModal}
            teacher={updateTeacher}
            onSave={updateTeacher?.id ? handleUpdate : handleAdd}
            onChange={setUpdateTeacher}
          />
        </div>
      </div>
    </>
  );
};

export default TeacherManagement;
