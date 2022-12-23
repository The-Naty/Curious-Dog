import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../../components/shared/Header';
import { userDataAtom } from '../../components/userData/userState';

const Explore: NextPage = () => {
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push('/');
    }
  }, [userData, router]);
  return (
    <div className="flex flex-col items-center">
      <Header page="explore" />
      {userData ? (
        <div className="flex items-center justify-center w-full">
          <div className="grid grid-rows-1 grid-cols-12 w-full ">
            <div className="col-start-4 col-end-10 mb-4 mt-8 mx-auto">
              <p>explore</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Explore;
