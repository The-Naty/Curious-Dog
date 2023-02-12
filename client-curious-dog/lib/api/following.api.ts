import { number } from 'yup';
import client from './client';
import { User, UserFollowerInfo, UserFollowingInfo } from '../interfaces/user.interface';

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
  pages: [
    {
      limit: number;
      count: number;
      followedBy: UserFollowerInfo[];
    },
  ];
}> => {
  const response = await client.get<{ pages: [{ limit: number; count: number; followedBy: UserFollowerInfo[] }] }>(`users/${params?.userId}/followers`, {
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
): Promise<{
  pages: [
    {
      limit: number;
      count: number;
      followedBy: UserFollowingInfo[];
    },
  ];
}> => {
  const response = await client.get<{
    pages: [
      {
        limit: number;
        count: number;
        followedBy: UserFollowingInfo[];
      },
    ];
  }>(`users/${params?.userId}/following`, {
    params: { ...params, PageParams },
  });
  return response.data;
};
