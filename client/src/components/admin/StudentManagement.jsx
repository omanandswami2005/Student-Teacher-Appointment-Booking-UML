import Navbar from "../Navbar";
import StudentList from "./StudentList";

const StudentManagement = () => {
    return (
        <div className="container mx-auto p-1">
            <Navbar title="Student Management !!!" />
            <StudentList />
        </div>
    );
};

export default StudentManagement;