import React from 'react';
import { User } from '../../lib/interfaces/user.interface';
import FeaturedListItem from './FeaturedListItem';

interface Props {
  featuredUsers?: Partial<User>[];
}
const FeaturedList = ({ featuredUsers }: Props) => {
  return (
    <>
      <h2 className="text-center">Check out our users with the most questions </h2>
      <div className="grid grid-rows-1 grid-cols-12 w-full ">
        <div className="col-start-3 col-end-11 mb-4 mt-8 w-full pb-2 overflow-x-auto overflow-y-none m-4 mb-0 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-rounded">
          <div className="flex ">
            {featuredUsers?.map(user => {
              return <FeaturedListItem key={user.username} featuredUser={user} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedList;
