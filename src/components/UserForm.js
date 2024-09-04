import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, editUser, editingUser, setEditingUser }) => {
  const [user, setUser] = useState({ id: '', name: '', email: '', company: { name: '' } });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ id: '', name: '', email: '', company: { name: '' } });
    }
  }, [editingUser]);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'company') {
      setUser({ ...user, company: { name: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Check if all fields are filled
    if (!user.name || !user.email || !user.company.name) {
      alert('All fields are required.');
      return;
    }

    // Email validation using regular expression
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // If editing a user, call editUser function, otherwise call addUser
    if (editingUser) {
      editUser(user)
        .then(() => {
          setEditingUser(null); // Clear editing state after successful update
        })
        .catch(error => console.error('Error editing user:', error));
    } else {
      addUser(user)
        .then(() => {
          setUser({ id: '', name: '', email: '', company: { name: '' } }); // Clear form after adding user
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Department"
        value={user.company.name}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
      {editingUser && (
        <button type="button" onClick={() => setEditingUser(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserForm;
