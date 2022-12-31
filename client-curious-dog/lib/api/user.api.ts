import client from './client';
import { User } from '../interfaces/user.interface';

export const logInUser = async (email: string, password: string): Promise<User> => {
  const response = await client.post<User>(`auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const fetchUser = async (): Promise<User> => {
  const response = await client.get<User>(`user/`);
  return response.data;
};
