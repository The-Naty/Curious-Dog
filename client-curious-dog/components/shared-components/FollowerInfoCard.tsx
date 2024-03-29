import React from 'react';
import { UserFollowerInfo } from '../../lib/interfaces/user.interface';

interface Props {
  user: UserFollowerInfo;
}
const FollowerInfoCard = ({ user }: Props) => {
  return (
    <a href={`/user/${user.followerId}`}>
      <div className="my-4  md:flex justify-center md:justify-start border border-rounded py-3 px-2 shadow hover:bg-gray-100">
        <div className="flex justify-center mr-4">
          <div className="rounded-full border-solid border-2 border-indigo-600">
            <img
              className="rounded-full"
              src={`${user.follower?.profilePicture ? user.follower?.profilePicture : '/static/placeholder.jpeg'}`}
              style={{ objectFit: 'contain' }}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="flex flex-col text-center md:text-left justify-center">
          <span className="break-all text-black">{user.follower?.username}</span>
          <span className="break-all text-black">
            {user.follower?._count?.receivedQuestions} {user.follower?._count?.receivedQuestions === 1 ? 'question' : 'questions'} Recived
          </span>
          <span className="break-all text-black">
            {user.follower?._count?.followers} {user.follower?._count?.followers === 1 ? 'follower' : 'followers'}
          </span>
        </div>
      </div>
    </a>
  );
};

export default FollowerInfoCard;
