"use client";
import React, { useEffect, useState } from "react";
import { CAFE_NAMES, LOGIN_PASS, LOGIN_PASS_ADMIN } from "../constants";
import CafeDetails from "@/components/admin/cafeDetails";

const AdminPanel = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFromData] = useState<{
    username: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/adminTips")
      .then((res) => res.json())
      .then((resData) => {
        const temp: any[] = [];

        CAFE_NAMES.map((cn) => {
          resData.adminTips.map((tips) => {
            if (cn == tips["_id"]) {
              temp.push(tips);
            }
          });
        });

        setData(temp);
      });
  }, []);

  const checkLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trueData = LOGIN_PASS_ADMIN;
    if (
      trueData &&
      trueData.username == (formData ? formData.username : "") &&
      trueData.password == (formData ? formData.password : "")
    )
      setIsLoggedIn(true);
    else setMessage("نام کاربری و یا رمز عبور اشتباه است.");
  };

  if (!isLoggedIn)
    return (
      <div className='px-8 sm:px-12'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
          <div className='w-full max-w-xs mx-auto'>
            <form
              className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
              onSubmit={checkLogin}>
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
          {message && <div className='text-center '>{message}</div>}
        </div>
      </div>
    );
  else
    return (
      <div className='px-8 sm:px-12'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20 text-center md:px-40'>
          <p className='text-xl text-green-600 mb-8'>
            لیست انعام های پرداخت شده توسط کافه ها
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20'>
            {data.length > 0 &&
              data.map((item) => <CafeDetails cafeDetails={item} />)}
          </div>
          {data.length == 0 && <p>هیچ انعامی پرداخت نشده!</p>}
        </div>
      </div>
    );
};

export default AdminPanel;
