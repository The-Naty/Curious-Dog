import { useQuery } from 'react-query';
import { fetchUserQuestions } from '../api/user.api';

function execute(params?: { asked: boolean; limit: number; page: number }) {
  return fetchUserQuestions(params);
}

export const useQuestions = (params?: { asked: boolean; limit: number; page: number }) =>
  useQuery(['user', 'questions', params], () => execute(params), { cacheTime: 0 });
