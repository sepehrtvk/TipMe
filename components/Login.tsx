import React, { useState } from "react";

const Login = ({ onButtonPress }: { onButtonPress: any }) => {
  const [formData, setFromData] = useState<{
    username: string;
    password: string;
  } | null>(null);

  return (
    <div className='w-full max-w-xs mx-auto'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault();
          e.stopPropagation();

          console.log("eee");
          onButtonPress(formData);
        }}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'>
            نام کاربری
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            onChange={(e) => {
              const value = e.target.value;
              const data = {
                username: value,
                password: formData?.password ? formData.password : "",
              };
              setFromData(data);
            }}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'>
            رمز عبور
          </label>
          <input
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='******************'
            onChange={(e) => {
              const value = e.target.value;
              const data = {
                username: formData?.username ? formData.username : "",
                password: value,
              };
              setFromData(data);
            }}
          />
        </div>
        <div className='flex items-center justify-center w-full mt-16'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
            type='submit'>
            ورود
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
