//token management
export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

//role management
export const setRole = (role) => localStorage.setItem('role', role);
export const getRole = () => localStorage.getItem('role');
export const removeRole = () => localStorage.removeItem('role');

//username management
export const setLoggedUsername = (username) => localStorage.setItem('username', username);
export const getLoggedUsername = () => localStorage.getItem('username');
export const removeLoggedUsername = () => localStorage.removeItem('username');