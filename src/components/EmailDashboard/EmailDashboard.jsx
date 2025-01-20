

// export default EmailDashboard;
import React, { useEffect, useState } from 'react';
import { getNotifications } from '../../utils/mockNotificationService';

const EmailDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    setNotifications(getNotifications());
  }, []);

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Jost, sans-serif',
    minHeight:'100vh'
  };

  const notificationStyle = (isEven) => ({
    backgroundColor: isEven ?'#B7C8CE':'#DEE4E6' ,
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  });

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize:"30px",
    color: '#00796b',
  };

  const listItemStyle = {
    marginBottom: '8px',
  };

  const responsiveStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  return (
    <div style={containerStyle} className='grainy-dark'>
      <h2 style={headerStyle}>Email Dashboard</h2>
      {notifications.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#757575' }}>No emails or updates.</p>
      ) : (
        <div style={responsiveStyle}>
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              style={notificationStyle(index % 2 === 0)}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Type: {notification.notificationType}
              </p>
              <p>
                <strong>To:</strong> {notification.recipientName} ({notification.recipientEmail})
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Details:</strong>
              </p>
              <ul>
                <li style={listItemStyle}>
                  <strong>Date:</strong> {notification.interviewData.date}
                </li>
                <li style={listItemStyle}>
                  <strong>Start Time:</strong> {notification.interviewData.timeSlot}
                </li>
                <li style={listItemStyle}>
                  <strong>Duration:</strong> {notification.interviewData.duration}
                </li>
                <li style={listItemStyle}>
                  <strong>Interviewer:</strong> {notification.interviewData.interviewerName}
                </li>
                <li style={listItemStyle}>
                  <strong>Type:</strong> {notification.interviewData.interviewType}
                </li>
              </ul>
              <p>
                <strong>Timestamp:</strong> {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailDashboard;

