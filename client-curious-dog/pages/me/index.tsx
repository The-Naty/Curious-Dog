import { NextPage } from 'next';
import Header from '../../components/header-components/Header';
import AuthGuard from '../../components/shared-components/AuthGuard';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import { useAtom } from 'jotai';
import Layout from '../../components/me-page/Layout';
import GenericLoading from '../../components/shared-components/GenericLoading';

const Profile: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  return (
    <div className="flex flex-col items-center">
      <Header page="me" />
      <AuthGuard loggedOutRedirectUrl={'/'}>
        {user ? (
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-rows-1 grid-cols-12 w-full bg-white	" style={{ minHeight: '100vh' }}>
              <div className="col-start-3 col-end-11 mb-4 mt-8 w-full">
                <Layout />
              </div>
            </div>
          </div>
        ) : userLoading ? (
          <GenericLoading />
        ) : null}
      </AuthGuard>
    </div>
  );
};

export default Profile;
