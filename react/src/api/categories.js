import instance from './axios';

export const getCategories = async () => {
  const { data } = await instance.get('/api/categories');
  return data;
};

export default { getCategories };
