import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function OpenRoutes({}) {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default OpenRoutes;
