// import { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import StudentRegistration from './pages/StudentRegistration';
import Dashboard from './pages/Dashboard';

import PrivateRoute from './components/PrivateRoute';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import { Navigate } from 'react-router-dom';
import TeacherManagement from './components/admin/TeacherManagement';
import StudentManagement from './components/admin/StudentManagement';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
function App() {


  
  return (

   <Routes>
     <Route path="/" element={<LandingPage />} />
     <Route path="/contact" element={<ContactPage />} />
 <Route path="/login" element={<Login />} />
 <Route path="/register" element={<StudentRegistration />} />
 <Route path="/verify-email" element={<VerifyEmail />} />
 <Route path="/forgot-password" element={<ForgotPassword />} />
 <Route path="/reset-password" element={<ResetPassword />} />



        
        <Route path="/admin" element={<PrivateRoute role="admin" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teachers" element={<TeacherManagement />} />
          <Route path="students" element={<StudentManagement  />} />

        </Route>
        
        <Route path="/student" element={<PrivateRoute role="student" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard/>} />
        </Route>


        <Route path="/teacher" element={<PrivateRoute role="teacher" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
        </Route>


{/* Wildcard route for undefined paths. Shows a 404 error */}
<Route path="*" element={<p>404 Not found</p>} />
   </Routes>
   
   
   
  );
}

export default App;
