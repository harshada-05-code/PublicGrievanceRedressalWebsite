// Centralized API configuration
export const API_BASE_URL = '/api';

// API endpoints
export const API_ENDPOINTS = {
  // User endpoints
  REGISTER: `${API_BASE_URL}/users/register`,
  LOGIN: `${API_BASE_URL}/users/login`,
  GET_ALL_USERS: `${API_BASE_URL}/users/all`,

  // Grievance endpoints
  CREATE_GRIEVANCE: `${API_BASE_URL}/grievances`,
  GET_MY_GRIEVANCES: `${API_BASE_URL}/grievances/my`,
  ASSIGN_GRIEVANCE: (id) => `${API_BASE_URL}/grievances/${id}/assign`,
};
