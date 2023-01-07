import { useInfiniteQuery } from 'react-query';
import { fetchUserQuestions } from '../api/user.api';

export const useQuestions = (params?: { asked: boolean; limit: number; page: number }) =>
  useInfiniteQuery(['user', 'questions', params], ({ pageParam = params?.page }) => fetchUserQuestions(pageParam, params), {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.count / lastPage.limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
