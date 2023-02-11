import { number } from 'yup';
import client from './client';
import { User } from '../interfaces/user.interface';

export const followUser = async (userId: number): Promise<void> => {
  const response = await client.post<void>(`users/${userId}/follow`);
  return response.data;
};

export const unfollowUser = async (userId: number): Promise<void> => {
  const response = await client.delete<void>(`users/${userId}/follow`);
  return response.data;
};

export const fetchUserFollowers = async (
  PageParams: number,
  params?: {
    limit: number;
    userId: number | undefined;
  },
): Promise<{
  limit: number;
  count: number;
  followedBy: User[];
}> => {
  const response = await client.get<{ limit: number; count: number; followedBy: User[] }>(`users/${params?.userId}/followers`, {
    params: { ...params, PageParams },
  });
  return response.data;
};

export const fetchUserFollowing = async (
  PageParams: number,
  params?: {
    limit: number;
    userId: number | undefined;
  },
): Promise<{ limit: number; count: number; following: User[] }> => {
  const response = await client.get<{ limit: number; count: number; following: User[] }>(`users/${params?.userId}/following`, {
    params: { ...params, PageParams },
  });
  return response.data;
};
