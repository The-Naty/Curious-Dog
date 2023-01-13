import React from 'react';

const renderPlaceholders = (limit: number, placeholderComponent: React.ReactElement) => {
  return new Array(limit).fill(placeholderComponent).map((comp, i) => {
    return React.cloneElement(placeholderComponent, { key: i });
  });
};

export { renderPlaceholders };
