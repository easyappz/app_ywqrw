import instance from './axios';

export const getListings = async (params = {}) => {
  const { data } = await instance.get('/api/listings', { params });
  return data;
};

export const getListing = async (id) => {
  const { data } = await instance.get(`/api/listings/${id}`);
  return data;
};

export const createListing = async (formData) => {
  const { data } = await instance.post('/api/listings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const closeListing = async (id) => {
  const { data } = await instance.patch(`/api/listings/${id}/close`);
  return data;
};

export default { getListings, getListing, createListing, closeListing };
