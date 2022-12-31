export const getAuthToken = () => {
  return localStorage.getItem('auth-token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('auth-token', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('auth-token');
};
