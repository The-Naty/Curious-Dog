import client from './client';

const authAPI = `${process.env.NEXT_PUBLIC_CURIOUS_DOG_DEV_BASE_URL}/auth`;
export const getUser = async (email: string, password: string) => {
  const response = await client.post(`${authAPI}/login`, {
    email,
    password,
  });
  return response.data;
};
