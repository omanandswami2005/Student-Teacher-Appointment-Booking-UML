import Navbar from '../components/Navbar';
import AppointmentsListForStudent from '../components/student/AppointmentListForStudent';
import Footer from '../components/Footer';

const StudentDashboard = () => {
  return (
    <>
      <Navbar title={'Student Dashboard !'} />
      <AppointmentsListForStudent IsTeacher={true} />

      <Footer />
    </>
  );
};
export default StudentDashboard;
