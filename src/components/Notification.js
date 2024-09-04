import React from 'react';
import '../styles/Notification.css';

const Notification = ({ userId, type, onClose }) => {
  if (!userId) return null;

  let message;
  switch (type) {
    case 'add':
      message = `User ID ${userId} added successfully.`;
      break;
    case 'edit':
      message = `User ID ${userId} updated successfully.`;
      break;
    case 'delete':
      message = `User ID ${userId} deleted successfully.`;
      break;
    default:
      message = '';
  }

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>x</button>
    </div>
  );
};

export default Notification;
