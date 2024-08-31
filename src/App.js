import React, { useEffect, useState } from 'react';
import { fetchUsers, addUser, editUser, deleteUser } from './utils/UserApi'; // Import API functions
import UserList from './components/UserList';
import UserForm from './components/UserForm'; 

const App = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [editingUser, setEditingUser] = useState(null); // State to store the user being edited

  // Fetch users from the API on component mount
  useEffect(() => {
    fetchUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Function to handle adding a new user
  const handleAddUser = (newUser) => {
    addUser(newUser)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error('Error adding user:', error));
  };

  // Function to handle editing an existing user
  const handleEditUser = (updatedUser) => {
    editUser(updatedUser)
      .then(() => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user)); 
        setEditingUser(null);
      })
      .catch(error => console.error('Error editing user:', error));
  };

  // Function to handle deleting a user
  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then(() => setUsers(users.filter(user => user.id !== id))) // Remove deleted user from list
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm addUser={handleAddUser} editUser={handleEditUser} editingUser={editingUser} />
      <UserList users={users} deleteUser={handleDeleteUser} setEditingUser={setEditingUser} />
    </div>
  );
};

export default App;
