import React from 'react';
import { User } from '../../lib/interfaces/user.interface';

interface Props {
  featuredUser: Partial<User>;
}
const FeaturedListItem = ({ featuredUser }: Props) => {
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
        <span className="text-sm text-gray-500 dark:text-gray-400">Quesitions {featuredUser._count?.receivedQuestions}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            follow
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedListItem;
