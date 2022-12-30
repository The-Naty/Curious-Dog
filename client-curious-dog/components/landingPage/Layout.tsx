import { useState, useEffect } from 'react';
import LoginForm from '../sharedComponents/LoginForm';
import RegistrationForm from '../sharedComponents/RegistrationForm';

const HomeLayout = () => {
  const [formDisplay, setFormDisplay] = useState<'login' | 'register'>('login');

  const openRegistrationFormHandler = () => {
    setFormDisplay('register');
  };

  const openLoginFormHandler = () => {
    setFormDisplay('login');
  };

  return (
    <div>
      {formDisplay === 'login' ? (
        <div className="mb-4 mt-24">
          <LoginForm openRegisterationForm={openRegistrationFormHandler} />
        </div>
      ) : null}
      {formDisplay === 'register' ? (
        <div className="mb-4 mt-24">
          <RegistrationForm openLoginForm={openLoginFormHandler} />
        </div>
      ) : null}
    </div>
  );
};

export default HomeLayout;
