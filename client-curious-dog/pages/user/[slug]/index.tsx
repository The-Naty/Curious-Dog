import { NextPage } from 'next';
import Header from '../../../components/header-components/Header';
import AuthGuard from '../../../components/shared-components/AuthGuard';
import { userAtom, userLoadingAtom } from '../../../lib/atoms/user.atom';
import { useAtom } from 'jotai';
import Layout from '../../../components/user-page/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GenericLoading from '../../../components/shared-components/GenericLoading';

const UserPage: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (user?.id == slug || typeof slug !== 'string') {
      router.push('/me');
    }
  });
  return (
    <div className="flex flex-col items-center">
      <Header />
      <AuthGuard loggedOutRedirectUrl={'/'}>
        {user && user.id != slug ? (
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-rows-1 grid-cols-12 w-full bg-white	" style={{ minHeight: '100vh' }}>
              <div className="col-start-3 col-end-11 mb-4 mt-8 w-full">{slug && typeof slug === 'string' ? <Layout userId={parseInt(slug)} /> : null}</div>
            </div>
          </div>
        ) : userLoading ? (
          <GenericLoading />
        ) : null}
      </AuthGuard>
    </div>
  );
};

export default UserPage;
