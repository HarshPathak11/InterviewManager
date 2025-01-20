// mockNotificationService.js

export const sendNotification = (notification) => {
   
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    notifications.push({
      id: Date.now(), // Unique ID
      timestamp: new Date().toISOString(),
      ...notification,
    });

    localStorage.setItem('notifications', JSON.stringify(notifications));
  };
  
  export const getNotifications = () => {
    
    return JSON.parse(localStorage.getItem('notifications')) || [];
  };
  