import React from 'react';
import { User } from '../../lib/interfaces/user.interface';
import FeaturedListItem from './FeaturedListItem';

interface Props {
  featuredUsers?: Partial<User>[];
}
const FeaturedList = ({ featuredUsers }: Props) => {
  console.log(featuredUsers);
  return (
    <div className="overflow-x-auto m-4 scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded ">
      <div className="flex ">
        {featuredUsers?.map(user => {
          return <FeaturedListItem key={user.username} featuredUser={user} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedList;
