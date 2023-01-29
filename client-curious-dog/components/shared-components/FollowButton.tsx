import { useAtom } from 'jotai';
import React, { useMemo, useState } from 'react';
import { userAtom } from '../../lib/atoms/user.atom';
import { isFollower } from '../../util/utilities';
import { User } from '../../lib/interfaces/user.interface';
import { followUser, unfollowUser } from '../../lib/api/following.api';
import { fetchUser } from '../../lib/api/user.api';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  actionedUser?: User;
  style?: string;
}
const FollowButton = ({ actionedUser, style }: Props) => {
  const [user, setUser] = useAtom(userAtom);

  const [loadClick, setLoadClick] = useState(false);
  const isFollwoingState = useMemo(() => {
    return isFollower(user, actionedUser);
  }, [user, actionedUser]);

  const handleFollow = async (userId?: number) => {
    if (userId) {
      setLoadClick(true);
      await followUser(userId);
      const data = await fetchUser();
      setUser(data);
      setLoadClick(false);
    }
  };

  const handleUnfollow = async (userId?: number) => {
    if (userId) {
      setLoadClick(true);
      await unfollowUser(userId);
      const data = await fetchUser();
      setUser(data);
      setLoadClick(false);
    }
  };

  return (
    <div className={`flex ${style ? style : ''}`}>
      <button
        className={`flex content-center bg-transparent enabled:hover:bg-indigo-500 text-indigo-700 font-semibold enabled:hover:text-white py-2 px-4 border border-indigo-500 enabled:hover:border-transparent rounded text-xs w-full ${
          loadClick ? '' : 'disabled:opacity-25'
        }`}
        onClick={() => {
          if (isFollwoingState) {
            handleUnfollow(actionedUser?.id);
          } else {
            handleFollow(actionedUser?.id);
          }
        }}
      >
        <span className="p-1">{loadClick ? <LoadingSpinner /> : isFollwoingState ? 'unfollow' : 'follow'}</span>
      </button>
    </div>
  );
};

export default FollowButton;
