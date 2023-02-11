import { useState } from 'react';
import { useFetchFollowers, useFetchFollowing } from '../../lib/hooks/following.hooks';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import Tabslist from './Tabslist';

interface Props {
  userId: number | undefined;
}
const UserFollowDetailsTabs = ({ userId }: Props) => {
  const [selected, setSelected] = useState(0);
  const [limit, setLimti] = useState(4);
  const tabs = ['followers', 'following'];

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
    hasNextPage: followingDataHasNextpage,
    fetchNextPage: followingDataFetchNextPage,
    isFetchingNextPage: followingDataIsFetchingNextPage,
  } = useFetchFollowing({
    limit: limit,
    userId: userId,
  });

  return (
    <div className="px-6">
      <Tabslist tabs={tabs} selected={selected} onTabUpdated={updateTabHandler} />
      {selected === 0 ? (
        <FollowersList
          followersData={followersData}
          followersDataHasNextpage={followersDataHasNextpage}
          followersDataFetchNextpage={followersDataFetchNextpage}
        />
      ) : null}

      {selected === 1 ? (
        <FollowingList
          followingData={followingData}
          followingDataHasNextpage={followingDataHasNextpage}
          followingDataFetchNextPage={followingDataFetchNextPage}
        />
      ) : null}
    </div>
  );
};

export default UserFollowDetailsTabs;
