import TextPlaceholder from './placeholders/TextPlaceholder';

interface Props {
  stats: { profilePicture: string | null; numQuestions: number; numFollowers: number; numFollowing: number } | undefined;
  isStatsLoading: boolean;
}
const UserHeader = ({ stats, isStatsLoading }: Props) => {
  return (
    <div className="px-6">
      <section className="bg-blueGray-50">
        <div className="w-full">
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <img
                  className="rounded-full"
                  src={`${stats?.profilePicture ? stats?.profilePicture : '/static/placeholder.jpeg'}`}
                  style={{ objectFit: 'contain' }}
                  width={200}
                  height={200}
                />
                <div className="w-full px-4 text-center mt-4">
                  <div className="md:flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="md:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {isStatsLoading ? <TextPlaceholder /> : stats?.numQuestions}
                      </span>
                      <span className="text-sm text-blueGray-400">Questions</span>
                    </div>
                    <div className="md:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {isStatsLoading ? <TextPlaceholder /> : stats?.numFollowers}
                      </span>
                      <span className="text-sm text-blueGray-400">Followers</span>
                    </div>
                    <div className="md:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {isStatsLoading ? <TextPlaceholder /> : stats?.numFollowing}
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
