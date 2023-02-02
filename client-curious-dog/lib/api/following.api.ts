import { number } from 'yup';
import client from './client';

export const followUser = async (userId: number): Promise<void> => {
  const response = await client.post<void>(`users/${userId}/follow`);
  return response.data;
};

export const unfollowUser = async (userId: number): Promise<void> => {
  const response = await client.delete<void>(`users/${userId}/follow`);
  return response.data;
};
