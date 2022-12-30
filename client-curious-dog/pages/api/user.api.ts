import client from './client';

export const logInUser = async (email: string, password: string) => {
  const response = await client.post(`auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const fetchUser = async () => {
  const response = await client.get(`user/`);
  return response.data;
};
