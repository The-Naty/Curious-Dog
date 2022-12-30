import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { clearAuthToken, getAuthToken } from '../util/token-storage';
import { userAtom } from '../atoms/user.atom';
import { fetchUser } from './api/user.api';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        try {
          const token = getAuthToken();
          if (token) {
            const data = await fetchUser();
            setUser(data);
          }
        } catch (err) {
          clearAuthToken();
        }
      }
    };
    fetchUserData();
  }, [user]);
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default MyApp;
