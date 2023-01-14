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

export { renderPlaceholders, computeUpdateAt };
