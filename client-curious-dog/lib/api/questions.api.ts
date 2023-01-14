import { Question } from '../interfaces/question.interface';
import client from './client';

export const answerQuestion = async (params: { id: number; answer: string }): Promise<Question> => {
  const response = await client.post<Question>(`questions/${params.id}/answers`, { answer: params.answer });
  return response.data;
};
