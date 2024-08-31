import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
export const fetchUsers = () => {
  return axios.get(API_URL);
};

// Add a new user
export const addUser = (user) => {
  return axios.post(API_URL, user);
};

// Edit an existing user
export const editUser = (user) => {
  return axios.put(`${API_URL}/${user.id}`, user);
};

// Delete a user
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
