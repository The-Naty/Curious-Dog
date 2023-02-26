import { NextPage } from 'next';
import Header from '../../components/header-components/Header';
import AuthGuard from '../../components/shared-components/AuthGuard';
import { userAtom } from '../../lib/atoms/user.atom';
import { useAtom } from 'jotai';
import Layout from '../../components/feed-page/Layout';

const Feed: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="flex flex-col items-center">
      <Header page={'feed'} />
      <AuthGuard loggedOutRedirectUrl={'/'}>
        {user ? (
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-rows-1 grid-cols-12 w-full bg-white	">
              <div className="col-start-3 col-end-12 mb-4 mt-8 w-full">
                <Layout />
              </div>
            </div>
          </div>
        ) : null}
      </AuthGuard>
    </div>
  );
};

export default Feed;
