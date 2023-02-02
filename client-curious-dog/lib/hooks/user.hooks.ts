import { useQuery } from 'react-query';
import { fetchFeaturedUsers } from '../api/user.api';

export const useFeaturedUsers = () => useQuery(['featured', 'users'], () => fetchFeaturedUsers());
