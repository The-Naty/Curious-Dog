import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { User } from '../../lib/interfaces/user.interface';
import { followUser, unfollowUser } from '../../lib/api/following.api';
import LoadingSpinner from './LoadingSpinner';
import { isFollower } from '../../util/utilities';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/atoms/user.atom';

interface Props {
  featuredUser: User;
}

const FeaturedListItem = ({ featuredUser }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [loadClick, setLoadClick] = useState(false);
  const isFollwoingState = useMemo(() => {
    return isFollower(user, featuredUser);
  }, [user, featuredUser]);

  const handleFollow = async (userId?: number) => {
    if (userId) {
      setLoadClick(true);
      await followUser(userId);
      setLoadClick(false);
    }
  };

  const handleUnfollow = async (userId?: number) => {
    if (userId) {
      setLoadClick(true);
      await unfollowUser(userId);
      setLoadClick(false);
    }
  };

  return (
    <div
      style={{ minWidth: '200px' }}
      className="w-full hover:shadow-indigo-500/40 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-2 "
    >
      <div className="flex flex-col items-center pb-10 p-2">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={`${featuredUser.profilePicture ? featuredUser.profilePicture : '/static/placeholder.jpeg'}`}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{featuredUser.username}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Questions {featuredUser._count?.receivedQuestions}</span>
        {featuredUser.id === user?.id ? null : (
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              className={`flex content-center bg-transparent enabled:hover:bg-indigo-500 text-indigo-700 font-semibold enabled:hover:text-white py-2 px-4 border border-indigo-500 enabled:hover:border-transparent rounded text-xs w-full ${
                loadClick ? '' : 'disabled:opacity-25'
              }`}
              onClick={() => {
                if (isFollwoingState) {
                  handleUnfollow(featuredUser?.id);
                } else {
                  handleFollow(featuredUser?.id);
                }
              }}
            >
              <span className="p-1">{loadClick ? <LoadingSpinner /> : isFollwoingState ? 'unfollow' : 'follow'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedListItem;
