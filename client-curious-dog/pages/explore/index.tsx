import { NextPage } from 'next';
import Header from '../../components/headerComponents/Header';
import AuthGuard from '../../components/sharedComponents/AuthGuard';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/user.atom';

const Explore: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="flex flex-col items-center">
      <Header page="explore" />
      <AuthGuard loggedOutRedirectUrl={'/'}>
        {user ? (
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-rows-1 grid-cols-12 w-full ">
              <div className="col-start-4 col-end-10 mb-4 mt-8 mx-auto">
                <p>explore</p>
              </div>
            </div>
          </div>
        ) : null}
      </AuthGuard>
    </div>
  );
};

export default Explore;
