import { useUserStats } from '../../lib/hooks/user.hooks';
import UserFollowDetailsTabs from '../shared-components/UserFollowDetailsTabs';
import UserHeader from '../shared-components/UserHeader';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
  userId?: number;
}
const Layout = ({ userId }: Props) => {
  const { data: statsData, isLoading: isStatsLoading, isError: isStatsError, error: statsError } = useUserStats({
    userId: userId,
  });
  const router = useRouter();

  useEffect(() => {
    if (isStatsError && statsError?.response?.status === 404) {
      router.push('/');
    }
  }, [isStatsError, router, statsError]);
  return (
    <>
      <div className="xl:flex flex-row-reverse  items-start my-4">
        <div className="flex flex-col justify-center"></div>
        <div className="flex flex-col justify-center flex-grow px-4">
          <UserHeader stats={statsData} isStatsLoading={isStatsLoading} />
          <UserFollowDetailsTabs userId={userId} />
        </div>
      </div>
    </>
  );
};

export default Layout;
