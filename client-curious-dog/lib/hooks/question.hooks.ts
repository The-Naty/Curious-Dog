import { useQuery } from 'react-query';
import { fetchUserQuestions } from '../api/user.api';

export const useQuestions = (params?: { asked: boolean; limit: number; page: number }) =>
  useQuery(['user', 'questions', params], () => fetchUserQuestions(params), { cacheTime: 0 });
