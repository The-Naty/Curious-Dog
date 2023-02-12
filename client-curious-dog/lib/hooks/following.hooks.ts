import { useInfiniteQuery } from 'react-query';
import { fetchUserFollowers, fetchUserFollowing } from '../api/following.api';

export const useFetchFollowers = (params?: { limit: number; userId: number | undefined }) =>
  useInfiniteQuery(['user', 'followers', params], ({ pageParam = 1 }) => fetchUserFollowers(pageParam, params), {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.count / lastPage.limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

export const useFetchFollowing = (params?: { limit: number; userId: number | undefined }) =>
  useInfiniteQuery(['user', 'following', params], ({ pageParam = 1 }) => fetchUserFollowing(pageParam, params), {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.count / lastPage.limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
