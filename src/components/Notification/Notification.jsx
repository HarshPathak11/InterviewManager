// src/components/Notification/Notification.jsx
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${props => props.type === 'error' ? '#e74c3c' : '#2ecc71'};
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  animation: ${fadeInOut} 3s forwards;
  z-index: 1000;
`;

const Notification = ({ message, type, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);



  return (
    <NotificationContainer type={type}>
      {message}
    </NotificationContainer>
  );
};

export default Notification;
