import client from './client';

const authAPI = `${process.env.NEXT_PUBLIC_CURIOUS_DOG_DEV_BASE_URL}/auth`;
const userAPI = `${process.env.NEXT_PUBLIC_CURIOUS_DOG_DEV_BASE_URL}/user`;
export const logInUser = async (email: string, password: string) => {
  const response = await client.post(`${authAPI}/login`, {
    email,
    password,
  });
  return response.data;
};

export const fetchUser = async (id: number) => {
  const response = await client.get(`${userAPI}/${id}`);
  console.log(response.data);
  return response.data;
};
