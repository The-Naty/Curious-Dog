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
    recived: boolean;
    asked: boolean;
    limit: number;
    followingRecived: boolean;
    followingAsked: boolean;
  },
): Promise<{ limit: number; count: number; questions: (Question & { asker: User | null })[] }> => {
  const response = await client.get<{ limit: number; count: number; questions: (Question & { asker: User | null })[] }>(`user/questions`, {
    params: { ...params, PageParams },
  });
  return response.data;
};

export const fetchFeaturedUsers = async (): Promise<User[]> => {
  const response = await client.get<User[]>(`users/featured`, {});
  return response.data;
};

export const uploadProfilePicture = async (profilePicture: any): Promise<any> => {
  const formData = new FormData();
  formData.append('profilePicture', profilePicture);

  const response = await client.put<Partial<User>[]>(`users/profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const fetchUserStats = async (params?: {
  userId: number | undefined;
}): Promise<{ profilePicture: string | null; numQuestions: number; numFollowers: number; numFollowing: number }> => {
  const response = await client.get<{ profilePicture: string | null; numQuestions: number; numFollowers: number; numFollowing: number }>(
    `user/${params?.userId}/stats`,
  );
  return response.data;
};
