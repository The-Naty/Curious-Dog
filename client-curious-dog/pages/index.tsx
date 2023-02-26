import { NextPage } from 'next';
import Header from '../components/header-components/Header';
import LandingLayout from '../components/landing-page/Layout';
import AuthGuard from '../components/shared-components/AuthGuard';
import { useAtom } from 'jotai';
import { userAtom, userLoadingAtom } from '../lib/atoms/user.atom';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  return (
    <div className="flex flex-col items-center">
      <Header page="" />
      <AuthGuard loggedInRedirectUrl="/feed">
        {user || userLoading ? null : (
          <div className="flex items-center justify-center w-full">
            <div className=" w-full bg-white">
              <div className="mb-4 mt-8 mx-auto">
                <LandingLayout />
              </div>
            </div>
          </div>
        )}
      </AuthGuard>
    </div>
  );
};

export default Home;
