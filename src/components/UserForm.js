import React, { useState, useEffect } from 'react';
import '../styles/UserForm.css';


const UserForm = ({ addUser, editUser, editingUser, setEditingUser }) => {
  const [user, setUser] = useState({ id: '', name: '', email: '', company: { name: '' } });

  // Update form state when editingUser changes.
  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ id: '', name: '', email: '', company: { name: '' } });
    }
  }, [editingUser]);

  // Handle input changes in the form.
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'company') {
      setUser({ ...user, company: { name: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields.
    if (!user.name || !user.email || !user.company.name) {
      alert('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Call addUser or editUser based on whether editingUser is set.
    if (editingUser) {
      editUser(user)
        .then(() => setEditingUser(null))
        .catch(error => console.error('Error editing user:', error));
    } else {
      addUser(user)
        .then(() => setUser({ id: '', name: '', email: '', company: { name: '' } }))
        .catch(error => console.error('Error adding user:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
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
        <button type="button" onClick={() => setEditingUser(null)} className="cancel-button">
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserForm;
