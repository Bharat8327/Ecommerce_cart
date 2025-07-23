import React from 'react';
import Navbar from '../components/NavBar';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectRoutes({ role }) {
  // const token = localStorage.getItem('token');
  // const roleFromBackend = '';
  // if (!token && token !== 'undefined' && !role.includes('customer')) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <Navbar />
      {role !== 'Admin' && <Outlet />}
    </div>
  );
}

export default ProtectRoutes;
