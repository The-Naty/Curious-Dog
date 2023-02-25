import { Question } from '../interfaces/question.interface';
import { User } from '../interfaces/user.interface';
import client from './client';

export const askQuestion = async (params: { receiverId: number | undefined; isAnonymous: boolean; body: string }): Promise<Question> => {
  const response = await client.post<Question>(`users/${params.receiverId}/questions`, { isAnonymous: params.isAnonymous, body: params.body });
  return response.data;
};

export const answerQuestion = async (params: { id: number; answer: string }): Promise<Question> => {
  const response = await client.post<Question>(`questions/${params.id}/answers`, { answer: params.answer });
  return response.data;
};

export const fetchAllQuestions = async (
  PageParams: number,
  params?: {
    limit: number;
  },
): Promise<{ limit: number; count: number; questions: (Question & { asker: User | null } & { receiver: User })[] }> => {
  const response = await client.get<{ limit: number; count: number; questions: (Question & { asker: User | null } & { receiver: User })[] }>(`questions`, {
    params: { ...params, PageParams },
  });
  return response.data;
};
