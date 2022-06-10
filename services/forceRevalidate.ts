import axios from 'axios';

export const forceRevalidate = async (token: string, path: string) => {
  await axios.get(`/api/revalidate?secret=${token}&path=${path}`);
};
