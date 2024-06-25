// import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import StudentRegistration from './pages/StudentRegistration';
import Dashboard from './pages/Dashboard';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
function App() {

  return (
   <Routes>
<Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />

<Route path="/studentregistration" element={<PublicRoute> <StudentRegistration /> </PublicRoute>} />

<Route path="/dash" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />


{/* Wildcard route for undefined paths. Shows a 404 error */}
<Route path="*" element={<p>404 Not found</p>} />
   </Routes>
  );
}

export default App;
