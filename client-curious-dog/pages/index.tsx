import { NextPage } from 'next';
import Header from '../components/HeaderComponents/Header';
import LandingLayout from '../components/LandingPage/Layout';
import ProtectorComponent from '../components/SharedComponents/ProtectorComponent';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <Header page="" />
      <ProtectorComponent
        userDisplay={null}
        emptyUserDisplay={
          <div className="flex items-center justify-center w-full">
            <div className=" w-full ">
              <div className="mb-4 mt-8 mx-auto">
                <LandingLayout />
              </div>
            </div>
          </div>
        }
        emptyRedirectionUrl={'/feed'}
        reverse={true}
      />
    </div>
  );
};

export default Home;
