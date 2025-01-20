// mockNotificationService.js

export const sendNotification = (notification) => {
    // Retrieve existing notifications from localStorage
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    console.log(notification)
  
    // Add the new notification
    notifications.push({
      id: Date.now(), // Unique ID
      timestamp: new Date().toISOString(),
      ...notification,
    });
  
    // Save back to localStorage
    localStorage.setItem('notifications', JSON.stringify(notifications));
  };
  
  export const getNotifications = () => {
    // Retrieve notifications from localStorage
    return JSON.parse(localStorage.getItem('notifications')) || [];
  };
  