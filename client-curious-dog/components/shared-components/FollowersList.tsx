import { useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useFetchFollowers } from '../../lib/hooks/following.hooks';
import FollowerInfoCard from './FollowerInfoCard';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  userId: number;
  limit: number;
}
const FollowersList = ({ userId, limit }: Props) => {
  const {
    data: followersData,
    isLoading: isFollowersDataLoading,
    hasNextPage: followersDataHasNextpage,
    fetchNextPage: followersDataFetchNextpage,
    isFetchingNextPage: followersDataIsFetchingNextpage,
  } = useFetchFollowers({
    limit: limit,
    userId: userId,
  });

  useBottomScrollListener(
    useCallback(async () => {
      if (followersDataHasNextpage) {
        await followersDataFetchNextpage();
      }
    }, [followersDataFetchNextpage, followersDataHasNextpage]),
  );

  return (
    <div className="px-4">
      {isFollowersDataLoading ? (
        <div className="mt-4 flex align-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        followersData?.pages.map((p: any) => {
          return p.followedBy.length > 0 ? (
            p.followedBy?.map((follower: any) => {
              return <FollowerInfoCard key={follower.follower.id} user={follower} />;
            })
          ) : (
            <div className="text-center p-4 text-black"> There are no followers found here</div>
          );
        })
      )}
    </div>
  );
};

export default FollowersList;
