import Navbar from "../components/Navbar";
import AppointmentsListForStudent from "../components/student/AppointmentListForStudent";

const StudentDashboard = () => {
    return (<>
        <Navbar title={'Student Dashboard !'} />
        <AppointmentsListForStudent IsTeacher={true} />
        </>
    )
};
export default StudentDashboard