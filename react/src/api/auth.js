import instance from './axios';

const TOKEN_KEY = 'token';

const saveToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (_) {
    // ignore
  }
};

export const register = async ({ email, name, password }) => {
  const { data } = await instance.post('/api/auth/register', { email, name, password });
  if (data?.token) saveToken(data.token);
  return data;
};

export const login = async ({ email, password }) => {
  const { data } = await instance.post('/api/auth/login', { email, password });
  if (data?.token) saveToken(data.token);
  return data;
};

export default { register, login };
