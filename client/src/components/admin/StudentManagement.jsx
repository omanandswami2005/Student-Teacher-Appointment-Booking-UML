import Navbar from '../Navbar';
import StudentList from './StudentList';

/**
 * Defines the StudentManagement component.
 *
 * @return {JSX.Element} The rendered StudentManagement component.
 */
const StudentManagement = () => {
  return (
    <div className="container mx-auto p-1">
      <Navbar title="Student Management !" />
      <StudentList />
    </div>
  );
};

export default StudentManagement;
