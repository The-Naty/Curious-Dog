import { useQuery } from 'react-query';
import { fetchFeaturedUsers, fetchUserStats } from '../api/user.api';

export const useFeaturedUsers = () => useQuery(['featured', 'users'], () => fetchFeaturedUsers());
export const useUserStats = (params: { userId: number | undefined }) => useQuery(['user', 'stats', params], () => fetchUserStats(params));
