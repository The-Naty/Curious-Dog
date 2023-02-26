import { useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useFetchFollowing } from '../../lib/hooks/following.hooks';
import FollowingInfoCard from './FollowingInfoCard';

interface Props {
  userId: number;
  limit: number;
}

const FollowingList = ({ userId, limit }: Props) => {
  const {
    data: followingData,
    isLoading: isFollowingDataLoading,
    hasNextPage: followingDataHasNextpage,
    fetchNextPage: followingDataFetchNextPage,
    isFetchingNextPage: followingDataIsFetchingNextPage,
  } = useFetchFollowing({
    limit: limit,
    userId: userId,
  });

  useBottomScrollListener(
    useCallback(async () => {
      if (followingDataHasNextpage) {
        await followingDataFetchNextPage();
      }
    }, [followingDataFetchNextPage, followingDataHasNextpage]),
  );

  return (
    <div className="px-4">
      {followingData?.pages.map((p: any) => {
        return p.following?.length > 0 ? (
          p.following?.map((followe: any) => {
            return <FollowingInfoCard key={followe.folllowing.id} user={followe} />;
          })
        ) : (
          <div className="text-center p-4"> There are no follwings found here</div>
        );
      })}
    </div>
  );
};

export default FollowingList;