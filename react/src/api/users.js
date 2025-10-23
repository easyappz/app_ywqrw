import instance from './axios';

export const getMe = async () => {
  const { data } = await instance.get('/api/users/me');
  return data;
};

export const getMyListings = async () => {
  const { data } = await instance.get('/api/users/me/listings');
  return data;
};

export default { getMe, getMyListings };
