import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { clearAuthToken, getAuthToken } from '../util/token-storage';
import { userDataAtom } from '../components/userData/userState';
import { fetchUser } from './api/userApi';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const [userData, setUserData] = useAtom(userDataAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData) {
        try {
          const token = getAuthToken();
          if (token) {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            console.log(tokenPayload);
            const { id } = tokenPayload;
            const data = await fetchUser(id);
            setUserData(data);
          }
        } catch (err) {
          console.log(err);
          clearAuthToken();
        } finally {
          // setLoadingUser(false);
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
