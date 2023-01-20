import React from 'react';
import { User } from '../../lib/interfaces/user.interface';

interface Props {
  receiver?: User | null;
}
const ReceiverHeader = ({ receiver }: Props) => {
  return (
    <div className="flex justify-between border-b-2 border-indigo-200 pb-2 mb-2">
      <div className="h-full">
        <p>{receiver?.username}</p>
        <span className="text-xs"> was asked</span>
      </div>
      <div className="rounded-full border-solid border-2 border-indigo-600">
        <img
          className="rounded-full"
          src={`${receiver?.profilePicture ? receiver?.profilePicture : '/static/placeholder.jpeg'}`}
          style={{ objectFit: 'contain' }}
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default ReceiverHeader;
