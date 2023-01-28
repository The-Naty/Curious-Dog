import React from 'react';
import moment from 'moment';

const renderPlaceholders = (limit: number, placeholderComponent: React.ReactElement): React.ReactElement[] => {
  return new Array(limit).fill(null).map((comp, i) => {
    return React.cloneElement(placeholderComponent, { key: i });
  });
};

const computeUpdateAt = (updatedAt: string): string => {
  return `${moment(updatedAt).fromNow()}`;
};

const isFollower = (following: any, userId?: number) => {
  console.log(following, userId);
  return following.length ? (following?.findIndex((id: any) => id === userId) > -1 ? true : false) : false;
};

export { renderPlaceholders, computeUpdateAt, isFollower };
