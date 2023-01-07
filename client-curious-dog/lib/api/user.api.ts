import { Question } from '../interfaces/question.interface';
import { User } from '../interfaces/user.interface';
import client from './client';

export const logInUser = async (email: string, password: string): Promise<User> => {
  const response = await client.post<User>(`auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (email: string, password: string, username: string): Promise<User> => {
  const response = await client.post<User>(`auth/register`, {
    email,
    password,
    username,
  });
  return response.data;
};

export const fetchUser = async (): Promise<User> => {
  const response = await client.get<User>(`user/`);
  return response.data;
};

export const fetchUserQuestions = async (
  PageParams: number,
  params?: {
    asked: boolean;
    limit: number;
  },
): Promise<{ limit: number; count: number; questions: (Question & { asker: User | null })[] }> => {
  const response = await client.get<{ limit: number; count: number; questions: (Question & { asker: User | null })[] }>(`user/questions`, {
    params: { ...params, PageParams },
  });
  return response.data;
};
