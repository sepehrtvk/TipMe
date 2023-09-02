"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { toLocaleCurrencyString } from "@/app/common/Localization";
import { CAFE_NAMES, LOGIN_PASS } from "@/app/constants";
import Login from "@/components/Login";

const TABLE_HEAD = ["ردیف", "نام و نام خانوادگی", "موبایل", "انعام"];

const CafeTips = ({ params }: { params: { cafeName: string } }) => {
  const cafeName = params.cafeName;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [formData, setFromData] = useState<{
    username: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/cafe?cafeName=" + cafeName)
      .then((res) => res.json())
      .then((data) => {
        setData(data.paytips);
      });
  }, []);

  const checkLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trueData = LOGIN_PASS.filter((item) => item.cafeName == cafeName)[0];

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

  if (!CAFE_NAMES.includes(cafeName)) {
    return (
      <div className='px-8 sm:px-12'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20 text-center'>
          <p className='text-xl'>کافه مورد نظر در تیپ می یافت نشد!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='px-8 sm:px-12'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
          <div className='text-right text-xl'>
            <p className='mb-12 mx-8'>
              لیست انعام های ثبت شده برای کافه {cafeName} :
            </p>
          </div>
          <Card className='h-full w-full overflow-scroll '>
            <table className='w-full min-w-max table-auto '>
              <thead className='bg-slate-300 '>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-slate-950 '>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal leading-none font-bold'>
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='bg-slate-200'>
                {data &&
                  data.length > 0 &&
                  data.map((payTip, index) => {
                    const isLast = index === data.length - 1;
                    const classes = isLast
                      ? "p-4 text-center"
                      : "p-4 text-center border-b border-blue-gray-50";

                    return (
                      <tr key={index + 1}>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'>
                            {index + 1}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'>
                            {payTip.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'>
                            {payTip.phone}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'>
                            {toLocaleCurrencyString(payTip.amount, true, true)}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Card>
          <div className='text-right mt-12 mx-8'>
            <span className='font-bold'>مجموع انعام های دریافت شده : </span>
            {data && data.length > 0 && (
              <span>
                {toLocaleCurrencyString(
                  data.reduce((n, { amount }) => n + amount, 0),
                  true,
                  true
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CafeTips;
