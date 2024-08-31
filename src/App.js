import React, { useEffect, useState } from 'react';
import { fetchUsers, addUser, editUser, deleteUser } from './utils/UserApi'; // Import API functions
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Notification from './components/Notification'; // Import the Notification component

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState({ userId: null, type: '' }); // To store notification info
  const usersPerPage = 5;

  // Fetch users from the API on component mount
  useEffect(() => {
    fetchUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Function to handle adding a new user
  const handleAddUser = (newUser) => {
    addUser(newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNotification({ userId: response.data.id, type: 'add' }); // Set notification for added user
      })
      .catch(error => console.error('Error adding user:', error));
  };

  // Function to handle editing an existing user
  const handleEditUser = (updatedUser) => {
    editUser(updatedUser)
      .then(() => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setEditingUser(null);
        setNotification({ userId: updatedUser.id, type: 'edit' }); // Set notification for edited user
      })
      .catch(error => console.error('Error editing user:', error));
  };

  // Function to handle deleting a user
  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        setNotification({ userId: id, type: 'delete' }); // Set notification for deleted user
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous and next page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Close notification
  const closeNotification = () => setNotification({ userId: null, type: '' });

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.userId) {
      const timer = setTimeout(() => {
        closeNotification();
      }, 3000); // 3000ms = 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount or notification change
    }
  }, [notification]);

  return (
    <div>
      <h1>User Management</h1>
      <UserForm addUser={handleAddUser} editUser={handleEditUser} editingUser={editingUser} />
      <UserList users={currentUsers} deleteUser={handleDeleteUser} setEditingUser={setEditingUser} />
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          &#9664; {/* Left arrow */}
        </button>
        {[...Array(totalPages).keys()].map(pageNumber => (
          <button key={pageNumber + 1} onClick={() => paginate(pageNumber + 1)} className={currentPage === pageNumber + 1 ? 'active' : ''}>
            {pageNumber + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          &#9654; {/* Right arrow */}
        </button>
      </div>
      <Notification userId={notification.userId} type={notification.type} onClose={closeNotification} />
    </div>
  );
};

export default App;
