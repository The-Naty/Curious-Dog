import { useState } from 'react';
import LoginForm from '../SharedComponents/LoginForm';
import RegistrationForm from '../SharedComponents/RegistrationForm';
const HomeLayout = () => {
  const [formDisplay, setFormDisplay] = useState('log');
  const changeDisplayHandler = (dis: string) => {
    setFormDisplay(dis);
  };
  console.log(formDisplay);
  return (
    <div>
      {formDisplay === 'log' ? (
        <div className="mb-4 mt-6">
          <LoginForm changeDis={changeDisplayHandler} />
        </div>
      ) : null}
      {formDisplay === 'reg' ? (
        <div className="mb-4 mt-6">
          <RegistrationForm changeDis={changeDisplayHandler} />
        </div>
      ) : null}
    </div>
  );
};

export default HomeLayout;
