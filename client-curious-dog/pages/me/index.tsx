import { NextPage } from 'next';
import Header from '../../components/header-components/Header';
import AuthGuard from '../../components/shared-components/AuthGuard';
import { userAtom } from '../../lib/atoms/user.atom';
import { useAtom } from 'jotai';

const Profile: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="flex flex-col items-center">
      <Header page="me" />
      <AuthGuard loggedOutRedirectUrl={'/'}>
        {user ? (
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-rows-1 grid-cols-12 w-full ">
              <div className="col-start-4 col-end-10 mb-4 mt-8 mx-auto">
                <p>feed</p>
              </div>
            </div>
          </div>
        ) : null}
      </AuthGuard>
    </div>
  );
};

export default Profile;
