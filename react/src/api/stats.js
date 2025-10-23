import instance from './axios';

export const getAdminStats = async () => {
  const { data } = await instance.get('/api/admin/stats');
  return data;
};

export default { getAdminStats };
