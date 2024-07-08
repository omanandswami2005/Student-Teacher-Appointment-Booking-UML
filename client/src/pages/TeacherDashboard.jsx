import AppointmentsList from '../components/teacher/AppointmentList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * Renders the TeacherDashboard component.
 *
 * @return {JSX.Element} The rendered TeacherDashboard component.
 */
const TeacherDashboard = () => {
  return (
    <div>
      <Navbar title={'Teacher Dashboard !'} />
      <AppointmentsList IsTeacher={false} />
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
