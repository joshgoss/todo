const ACCOUNT_KEY = "account";
const AUTH_KEY = "auth";

export const hasTokenExpired = (expiration) => {
  const today = Date.now() / 1000;
  return today >= expiration;
};

export const setAccount = (account) => {
  return localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
};

export const getAccount = () => {
  const json = localStorage.getItem(ACCOUNT_KEY);
  return json ? JSON.parse(json) : undefined;
};

export const setAuth = (data) => {
  return localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

export const getAuth = () => {
  const json = localStorage.getItem(AUTH_KEY);
  return json ? JSON.parse(json) : undefined;
};

export const isAuthenticated = () => {
  const auth = getAuth();
  return auth && auth.access_token;
};

export const clearSession = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(ACCOUNT_KEY);
};
