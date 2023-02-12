import React from 'react';
import ContentLoader from 'react-content-loader';

const TextPlaceholder = () => {
  return (
    <div className="flex justify-center my-1">
      <ContentLoader speed={2} width={60} height={20} viewBox="0 0 60 20" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
        <rect x="3" y="2" rx="3" ry="3" width="55" height="17" />
      </ContentLoader>
    </div>
  );
};

export default TextPlaceholder;
