import AppointmentsList from '../components/teacher/AppointmentList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
