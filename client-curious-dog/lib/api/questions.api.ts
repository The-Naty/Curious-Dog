import { Question } from '../interfaces/question.interface';
import client from './client';

export const fetchQuestions = async (asekd: boolean): Promise<Question[]> => {
  const response = await client.get<Question[]>(`questions/me?asked=false`);
  return response.data;
};
