import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, editUser, editingUser }) => {
  const [user, setUser] = useState({ id: '', name: '', email: '', company: { name: '' } });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ id: '', name: '', email: '', company: { name: '' } });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'company') {
      setUser({ ...user, company: { name: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.name || !user.email || !user.company.name) {
      alert('All fields are required.');
      return;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (editingUser) {
      editUser(user);
    } else {
      addUser(user);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
      <input type="text" name="company" placeholder="Department" value={user.company.name} onChange={handleChange} required />
      <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
    </form>
  );
};
export default UserForm;
