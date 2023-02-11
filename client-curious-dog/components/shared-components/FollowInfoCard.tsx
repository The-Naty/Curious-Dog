import React from 'react';
import { User } from '../../lib/interfaces/user.interface';

interface Props {
  user: User;
}
const FollowInfoCard = ({ user }: Props) => {
  console.log(user);
  return (
    <div className="my-4  md:flex justify-center md:justify-start border border-rounded py-3 px-2 shadow">
      <div className="flex justify-center mr-4">
        <div className="rounded-full border-solid border-2 border-indigo-600">
          <img
            className="rounded-full"
            src={`${user.profilePicture ? user.profilePicture : '/static/placeholder.jpeg'}`}
            style={{ objectFit: 'contain' }}
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="flex flex-col text-center md:text-left">
        <span className="break-all">{user.username}</span>
        <span className="break-all">{user.email}</span>
        <span className="break-all">
          {user._count?.receivedQuestions} {user._count?.receivedQuestions === 1 ? 'question' : 'questions'} Recived
        </span>
        <span className="break-all">
          {user._count?.followers} {user._count?.followers === 1 ? 'follower' : 'followers'}
        </span>
      </div>
    </div>
  );
};

export default FollowInfoCard;
