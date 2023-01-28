import React from 'react';
import moment from 'moment';
import { User } from '../lib/interfaces/user.interface';

const renderPlaceholders = (limit: number, placeholderComponent: React.ReactElement): React.ReactElement[] => {
  return new Array(limit).fill(null).map((comp, i) => {
    return React.cloneElement(placeholderComponent, { key: i });
  });
};

const computeUpdateAt = (updatedAt: string): string => {
  return `${moment(updatedAt).fromNow()}`;
};

const isFollower = (userA: User | null, userB: User) => {
  const userAFollowers =
    userA?.followers?.map(({ followingId }) => {
      return followingId;
    }) ?? [];

  return userAFollowers.length ? (userAFollowers?.findIndex((id: any) => id === userB.id) > -1 ? true : false) : false;
};

export { renderPlaceholders, computeUpdateAt, isFollower };
