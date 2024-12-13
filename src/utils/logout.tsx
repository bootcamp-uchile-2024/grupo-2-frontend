export const logout = () => {
  localStorage.removeItem('token_jwt');
  window.location.href = '/admin';
};