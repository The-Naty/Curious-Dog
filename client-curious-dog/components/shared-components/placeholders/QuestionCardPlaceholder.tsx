import React from 'react';
import ContentLoader from 'react-content-loader';

const QuestionCardPlaceholder = () => {
  return (
    <div className="flex justify-center my-4">
      <div className="flex flex-col  md:max-w-xl rounded-lg bg-white shadow-lg w-full border-solid border-l-2 border-indigo-400">
        <div className="p-6 flex flex-col justify-start ">
          <ContentLoader speed={2} width={420} height={180} viewBox="0 0 400 160" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <rect x="100" y="66" rx="6" ry="6" width="108" height="12" />

            <rect x="10" y="111" rx="6" ry="6" width="200" height="60" />

            <circle cx="50" cy="50" r="50" />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
};

export default QuestionCardPlaceholder;
