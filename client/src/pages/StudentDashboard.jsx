import Navbar from '../components/Navbar';
import AppointmentsListForStudent from '../components/student/AppointmentListForStudent';
import Footer from '../components/Footer';

/**
 * Renders the StudentDashboard component.
 *
 * @return {JSX.Element} The rendered StudentDashboard component.
 */
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
