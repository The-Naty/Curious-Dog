import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { clearAuthToken, getAuthToken } from '../util/token-storage';
import { userAtom, userLoadingAtom } from '../lib/atoms/user.atom';
import { fetchUser } from '../lib/api/user.api';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserLoading(true);
        try {
          const token = getAuthToken();
          if (token) {
            const data = await fetchUser();
            setUser(data);
          }
        } catch (err) {
          clearAuthToken();
        } finally {
          setUserLoading(false);
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      {userLoading ? null : <Component {...pageProps} />}
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default MyApp;
