import { NextPage } from 'next';
import Header from '../components/headerComponents/Header';
import LandingLayout from '../components/landingPage/Layout';
import AuthGuard from '../components/sharedComponents/AuthGuard';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user.atom';

const Home: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="flex flex-col items-center">
      <Header page="" />
      <AuthGuard loggedInRedirectUrl="/feed">
        {user ? null : (
          <div className="flex items-center justify-center w-full">
            <div className=" w-full ">
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
