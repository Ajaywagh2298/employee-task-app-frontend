import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8095/api', // Backend URL
});

// Employee APIs
export const createEmployee = (data) => API.post('/employees', data);
export const getEmployees = () => API.get('/employees');
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);

// Task APIs
export const createTask = (data) => API.post('/tasks', data);
export const getTasks = () => API.get('/tasks');
export const updateTask = (taskId, data) => API.put(`/tasks/${taskId}`, data);

export default API;
