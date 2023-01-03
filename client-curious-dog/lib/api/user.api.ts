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

export const fetchUserQuestions = async (params?: { asked: boolean; limit: number; page: number }): Promise<{ count: number; questions: Question[] }> => {
  const response = await client.get<{ count: number; questions: Question[] }>(`user/questions`, { params });
  return response.data;
};
