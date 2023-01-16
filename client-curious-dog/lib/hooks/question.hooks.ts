import { useInfiniteQuery } from 'react-query';
import { fetchAllQuestions, fetchUserQuestions } from '../api/user.api';

export const useMyQuestions = (params?: { asked: boolean; limit: number }) =>
  useInfiniteQuery(['user', 'questions', params], ({ pageParam = 1 }) => fetchUserQuestions(pageParam, params), {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.count / lastPage.limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

export const useGlobalQuestions = (params?: { limit: number }) =>
  useInfiniteQuery(['global', 'questions', params], ({ pageParam = 1 }) => fetchAllQuestions(pageParam, params), {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.count / lastPage.limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
