import React, { useEffect, useState } from 'react';
import { fetchUsers, addUser, editUser, deleteUser } from './utils/UserApi'; // Import API functions
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    fetchUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Add a new user
  const handleAddUser = (newUser) => {
    addUser(newUser)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error('Error adding user:', error));
  };

  // Edit an existing user
  const handleEditUser = (updatedUser) => {
    editUser(updatedUser)
      .then(() => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setEditingUser(null);
      })
      .catch(error => console.error('Error editing user:', error));
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then(() => setUsers(users.filter(user => user.id !== id)))
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
