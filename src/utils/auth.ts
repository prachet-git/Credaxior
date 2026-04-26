export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  sessionStorage.removeItem("user");
  window.location.href = "/";
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem("user");
};