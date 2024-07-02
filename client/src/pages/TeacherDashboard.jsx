
import AppointmentsList from "../components/teacher/AppointmentList";
import Navbar from '../components/Navbar';

const TeacherDashboard = () => {


    return (
<div>
<Navbar title={'Teacher Dashboard !'} />
<AppointmentsList  IsTeacher={false}/>
</div>
        
    )
};

export default TeacherDashboard;