import { useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../../lib/atoms/user.atom';
import TextPlaceholder from './placeholders/TextPlaceholder';

interface Props {
  stats: { noQuestions: number; noFollowers: number; noFollowing: number } | undefined;
  statsLoading: boolean;
}
const UserHeader = ({ stats, statsLoading }: Props) => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="px-6">
      <section className="bg-blueGray-50">
        <div className="w-full">
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <img
                  className="rounded-full"
                  src={`${user?.profilePicture ? user?.profilePicture : '/static/placeholder.jpeg'}`}
                  style={{ objectFit: 'contain' }}
                  width={300}
                  height={300}
                />
                <div className="w-full px-4 text-center mt-4">
                  <div className="md:flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="md:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {statsLoading ? <TextPlaceholder /> : stats?.noQuestions}
                      </span>
                      <span className="text-sm text-blueGray-400">Questions</span>
                    </div>
                    <div className="md:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {statsLoading ? <TextPlaceholder /> : stats?.noFollowers}
                      </span>
                      <span className="text-sm text-blueGray-400">Followers</span>
                    </div>
                    <div className="md:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {statsLoading ? <TextPlaceholder /> : stats?.noFollowing}
                      </span>
                      <span className="text-sm text-blueGray-400">Following</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserHeader;
