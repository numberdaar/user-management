import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users'; // API base URL

// Fetch all users from the API
export const fetchUsers = () => {
  return axios.get(API_URL);
};

// Add a new user via API
export const addUser = (user) => {
  return axios.post(API_URL, user);
};

// Edit an existing user via API
export const editUser = (user) => {
  return axios.put(`${API_URL}/${user.id}`, user);
};

// Delete a user via API
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};