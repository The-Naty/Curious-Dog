import { useState } from 'react';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import Tabslist from './Tabslist';

interface Props {
  userId: number | undefined;
}
const UserFollowDetailsTabs = ({ userId }: Props) => {
  const tabs = ['followers', 'following'];
  const [selected, setSelected] = useState(0);
  const [limit, setLimti] = useState(4);

  const updateTabHandler = (tabIndex: number) => {
    setSelected(tabIndex);
  };

  return (
    <div className="px-6">
      <Tabslist tabs={tabs} selected={selected} onTabUpdated={updateTabHandler} />
      {selected === 0 && userId ? <FollowersList userId={userId} limit={limit} /> : null}
      {selected === 1 && userId ? <FollowingList userId={userId} limit={limit} /> : null}
    </div>
  );
};

export default UserFollowDetailsTabs;
