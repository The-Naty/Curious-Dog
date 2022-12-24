import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userDataAtom } from '../../components/userData/userState';

interface protectorComponentInterface {
  userDisplay: React.ReactNode;
  emptyUserDisplay: React.ReactNode;
  emptyRedirectionUrl: string;
  reverse?: boolean;
}
const ProtectorComponent = ({ userDisplay, emptyUserDisplay, emptyRedirectionUrl, reverse = false }: protectorComponentInterface) => {
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    if (reverse) {
      if (userData) {
        router.push(`${emptyRedirectionUrl}`);
      }
    } else {
      if (!userData) {
        router.push(`${emptyRedirectionUrl}`);
      }
    }
  }, [userData, router, emptyRedirectionUrl, reverse]);
  return userData ? <>{userDisplay}</> : <>{emptyUserDisplay}</>;
};

export default ProtectorComponent;
