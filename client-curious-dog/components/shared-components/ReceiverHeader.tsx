import React from 'react';
import { User } from '../../lib/interfaces/user.interface';
import FollowButton from './FollowButton';
import { userAtom } from '../../lib/atoms/user.atom';
import { useAtom } from 'jotai';

interface Props {
  receiver: User | null;
}
const ReceiverHeader = ({ receiver }: Props) => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="flex justify-between border-b-2 border-indigo-200 pb-2 mb-2">
      <div className="h-full">
        <p>{receiver?.username}</p>
        <span className="text-xs"> was asked</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-full border-solid border-2 border-indigo-600">
          <img
            className="rounded-full"
            src={`${receiver?.profilePicture ? receiver?.profilePicture : '/static/placeholder.jpeg'}`}
            style={{ objectFit: 'contain' }}
            width={50}
            height={50}
          />
        </div>
        {receiver && receiver.id !== user?.id ? <FollowButton actionedUser={receiver} style="mt-2" /> : null}
      </div>
    </div>
  );
};

export default ReceiverHeader;
