export const getLocalStorage = (key) => {
  const resultJson = localStorage.getItem(key);

  return JSON.parse(resultJson);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const redirectRoute = (route) => {
  window.location.href = route;
};
