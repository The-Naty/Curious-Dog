const renderPlaceholders = (limit: number, placeholder_component: React.ReactNode) => {
  return Array(limit).fill(placeholder_component);
};

export { renderPlaceholders };
