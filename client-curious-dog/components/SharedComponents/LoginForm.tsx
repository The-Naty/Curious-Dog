import React from 'react';
import { useQuery } from 'react-query';
import { getUser } from '../../pages/api/userApi';
import { userDataAtom } from '../userData/userState';
import { useAtom } from 'jotai';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { emailValidationObj, passwordValidationObj } from '../validation/sharedValidation';
import ValidationError from './ValidationError';

interface registrationFormProps {
  changeDis: any;
}

const LoginForm = ({ changeDis }: registrationFormProps) => {
  const [userData, setUserData] = useAtom(userDataAtom);
  const schema = yup.object().shape({
    email: emailValidationObj,
    password: passwordValidationObj,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const LoginHandler = (formData: { email: string; password: string }) => {
    const { data, isLoading, isFetching, refetch } = useQuery(['user', userData], () => getUser(formData.email, formData.password), {
      initialData: { userData: null },
      refetchInterval: 0,
      refetchOnWindowFocus: false,
    });
  };

  const onSubmit = (data: { email: string; password: string }) => {
    LoginHandler(data);
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-300 to-zinc-600 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w mx-auto">
          <div>
            <h1 className="text-2xl font-semibold text-center">Welcom Back</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <form className="py-8 text-sm  w-full space-y-6 text-gray-700 sm:text-lg sm:leading-10 " onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <input
                  id="email"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Email address"
                  {...register('email')}
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>
              {errors.email ? <ValidationError msg={errors.email.message} /> : null}

              <div className="relative">
                <input
                  id="password"
                  {...register('password')}
                  type="password"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              {errors.password ? <ValidationError msg={errors.password.message} /> : null}
              <div className="relative">
                <button
                  type="submit"
                  className="w-full
                  px-6
                  py-2.5
                  bg-purple-100
                  text-black
                  font-medium
                  text-xs
                  leading-tight
                  rounded
                  shadow-md
                  hover:bg-purple-300 hover:shadow-lg
                  focus:bg-purple-300 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-purple-400 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out"
                >
                  Log in
                </button>
              </div>
              <p className="text-center text-sm">
                Not a member
                <span
                  className="underline hover:text-purple-700 hover:shadow-lg hover:cursor-pointer
"
                  onClick={() => changeDis('reg')}
                >
                  {' '}
                  Register{' '}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
