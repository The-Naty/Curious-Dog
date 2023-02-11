import React, { useCallback, useState } from 'react';
import Tabslist from './Tabslist';
import { useFetchFollowers, useFetchFollowing } from '../../lib/hooks/following.hooks';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import FollowInfoCard from './FollowInfoCard';

interface Props {
  tabs: string[];
  limit: number;
  userId: number | undefined;
}
const TabsLayoutContainer = ({ tabs, limit, userId }: Props) => {
  const [selected, setSelected] = useState(0);

  const updateTabHandler = (tabIndex: number) => {
    setSelected(tabIndex);
  };

  const {
    data: followersData,
    isLoading: followersDataLoading,
    refetch: followersDataRefetch,
    hasNextPage: followersDataHasNextpage,
    fetchNextPage: followersDataFetchNextpage,
    isFetchingNextPage: followersDataIsFetchingNextpage,
  } = useFetchFollowers({
    limit: limit,
    userId: userId,
  });

  const {
    data: followingData,
    isLoading: followingDataLoading,
    refetch: followingDataRefetch,
    hasNextPage: followingDatahasNextpage,
    fetchNextPage: followingDataFetchNextPage,
    isFetchingNextPage: followingDataIsFetchingNextPage,
  } = useFetchFollowing({
    limit: limit,
    userId: userId,
  });

  useBottomScrollListener(
    useCallback(async () => {
      if (followersDataHasNextpage && selected === 0) {
        await followersDataFetchNextpage();
      }
      if (followingDatahasNextpage && selected === 1) {
        await followingDataFetchNextPage();
      }
    }, [followersDataFetchNextpage, followersDataHasNextpage, followingDataFetchNextPage, followingDatahasNextpage, selected]),
  );

  return (
    <div className="px-6">
      <Tabslist tabs={tabs} selected={selected} updateTab={updateTabHandler} />
      {selected === 0 ? (
        <div className="px-4">
          {followersData?.pages.map(p => {
            return p.followedBy.length > 0 ? (
              p.followedBy?.map(follower => {
                return <FollowInfoCard key={follower.follower.id} user={follower.follower} />;
              })
            ) : (
              <div className="text-center p-4"> There are no followers found here</div>
            );
          })}
        </div>
      ) : null}

      {selected === 1 ? (
        <div className="px-4">
          {followingData?.pages.map(p => {
            return p.following.length > 0 ? (
              p.following?.map(followe => {
                return <FollowInfoCard key={followe.folllowing.id} user={followe.folllowing} />;
              })
            ) : (
              <div className="text-center p-4"> There are no followings found here</div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TabsLayoutContainer;
