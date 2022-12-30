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
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const { id } = tokenPayload;
            const data = await fetchUser(id);
            setUser(data);
          }
        } catch (err) {
          console.log(err);
          clearAuthToken();
        }
      }
    };
    fetchUserData();
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default MyApp;
