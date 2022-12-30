import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/user.atom';

interface Props {
  loggedInRedirectUrl?: string;
  loggedOutRedirectUrl?: string;
  children: JSX.Element | null;
}
const AuthGuard = ({ loggedInRedirectUrl, loggedOutRedirectUrl, children }: Props): JSX.Element | null => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (loggedInRedirectUrl && user) {
      router.push(loggedInRedirectUrl);
    }
    if (loggedOutRedirectUrl && !user) {
      router.push(loggedOutRedirectUrl);
    }
  }, [user, router, loggedInRedirectUrl, loggedOutRedirectUrl]);

  return children;
};

export default AuthGuard;
