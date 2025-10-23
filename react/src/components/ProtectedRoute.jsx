import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return (
    <div data-easytag="id1-src/components/ProtectedRoute.jsx" style={{ display: 'contents' }}>{children}</div>
  );
};

export default ProtectedRoute;
