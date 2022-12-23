import { NextPage } from 'next';
import LandingLayout from '../components/LandingPage/Layout';
import Header from '../components/shared/Header';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { userDataAtom } from '../components/userData/userState';

const Home: NextPage = () => {
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      router.push('/feed');
    }
  }, [userData, router]);
  return (
    <div className="flex flex-col items-center">
      <Header page="" />
      {userData ? null : (
        <div className="flex items-center justify-center w-full">
          <div className="grid grid-rows-1 grid-cols-12 w-full ">
            <div className="col-start-4 col-end-10 mb-4 mt-8 mx-auto">
              <LandingLayout />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
