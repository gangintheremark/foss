import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import VideoChatPage from '@components/OpenVidu/Screen/VideoChatPage';

const VideoChatGuard = () => {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/not-found" replace />;
  }

  return <VideoChatPage />;
};

export default VideoChatGuard;
