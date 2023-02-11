import React, { useCallback } from 'react';
import { InfiniteData } from 'react-query';
import { UserFollowingInfo } from '../../lib/interfaces/user.interface';
import FollowingInfoCard from './FollowingInfoCard';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

interface Props {
  followingData: InfiniteData<{ pages: [{ limit: number; count: number; followedBy: UserFollowingInfo[] }] }> | undefined;
  followingDataHasNextpage: boolean | undefined;
  followingDataFetchNextPage: () => void;
}

const FollowingList = ({ followingData, followingDataHasNextpage, followingDataFetchNextPage }: Props) => {
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
