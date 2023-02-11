import React, { useCallback } from 'react';
import FollowerInfoCard from './FollowerInfoCard';
import { UserFollowerInfo } from '../../lib/interfaces/user.interface';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { InfiniteData } from 'react-query';

interface Props {
  followersData: InfiniteData<{ pages: [{ limit: number; count: number; followedBy: UserFollowerInfo[] }] }> | undefined;
  followersDataHasNextpage: boolean | undefined;
  followersDataFetchNextpage: () => void;
}
const FollowersList = ({ followersData, followersDataHasNextpage, followersDataFetchNextpage }: Props) => {
  useBottomScrollListener(
    useCallback(async () => {
      if (followersDataHasNextpage) {
        await followersDataFetchNextpage();
      }
    }, [followersDataFetchNextpage, followersDataHasNextpage]),
  );

  return (
    <div className="px-4">
      {followersData?.pages.map((p: any) => {
        return p.followedBy.length > 0 ? (
          p.followedBy?.map((follower: any) => {
            return <FollowerInfoCard key={follower.follower.id} user={follower} />;
          })
        ) : (
          <div className="text-center p-4"> There are no followers found here</div>
        );
      })}
    </div>
  );
};

export default FollowersList;
