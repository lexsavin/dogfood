export const setTokenLocalStorage = (token) =>
  localStorage.setItem("jwt_token", token);

export const getTokenLocalStorage = () => localStorage.getItem("jwt_token");

export const clearTokenLocalStorage = () =>
  localStorage.removeItem("jwt_token");
