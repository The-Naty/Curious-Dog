import { useAtom } from 'jotai';
import { userAtom } from '../../lib/atoms/user.atom';
import { User } from '../../lib/interfaces/user.interface';
import FollowButton from './FollowButton';

interface Props {
  featuredUser: User;
}

const FeaturedListItem = ({ featuredUser }: Props) => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div
      style={{ minWidth: '200px' }}
      className="w-full hover:shadow-indigo-500/40 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-2 "
    >
      <a href={featuredUser?.id === user?.id ? '/me' : `/user/${featuredUser?.id}`}>
        <div className="flex flex-col items-center pb-10 p-2">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={`${featuredUser.profilePicture ? featuredUser.profilePicture : '/static/placeholder.jpeg'}`}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{featuredUser.username}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">Questions {featuredUser._count?.receivedQuestions}</span>
          {featuredUser.id === user?.id ? null : <FollowButton actionedUser={featuredUser} style="mt-4 space-x-3 md:mt-6" />}
        </div>
      </a>
    </div>
  );
};

export default FeaturedListItem;
