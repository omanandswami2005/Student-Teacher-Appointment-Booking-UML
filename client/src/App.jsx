// import { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import PrivateRoute from './components/PrivateRoute';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDash from './pages/StudentDash';
import { Navigate } from 'react-router-dom';
import TeacherManagement from './components/admin/TeacherManagement';
import StudentManagement from './components/admin/StudentManagement';

function App() {


  
  return (

   <Routes>
 <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={<PrivateRoute role="admin" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teachers" element={<TeacherManagement />} />
          <Route path="students" element={<StudentManagement  />} />

        </Route>
        
        <Route path="/student" element={<PrivateRoute role="student" />}>
          <Route path="dashboard" element={<StudentDash/>} />
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
