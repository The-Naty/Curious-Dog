const renderPlaceholders = (limit: number, placeholderComponent: React.ReactNode) => {
  return Array(limit).fill(placeholderComponent);
};

export { renderPlaceholders };
