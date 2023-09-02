"use client";
import React, { useEffect, useState } from "react";

type BankParams = {
  status: string;
  ref_num: string;
  order_id: string;
  transaction_id: string;
  card_number: string;
  tracking_code: string;
};

const OrderDetails = ({ searchParams }: { searchParams: BankParams }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("true");

  useEffect(() => {
    if (searchParams && searchParams.ref_num) {
      const amountLocal = localStorage.getItem("paymentAmount");
      fetch("/api/ipgverify", {
        method: "POST",
        body: JSON.stringify({
          ...searchParams,
          amount: amountLocal ? +amountLocal : 0,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setMessage(json.data.message);
          localStorage.removeItem("paymentAmount");
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [searchParams]);

  if (isLoading)
    return (
      <div className='px-8 sm:px-12'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20 text-center'>
          <p className='text-xl text-slate-500'>در حال بارگذاری...</p>
        </div>
      </div>
    );

  if (+searchParams.status > 0)
    return (
      <div className='px-8 sm:px-12'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20 text-center'>
          <p className='text-xl text-green-600'>پرداخت با موفقیت انجام شد.</p>
          <p className='text-lg '>با تشکر از پرداخت شما</p>
          {message && <p>{message}</p>}
        </div>
      </div>
    );
  else
    return (
      <div className='px-8 sm:px-12'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20 text-center'>
          <p className='text-xl text-rose-600'>پرداخت با خطا مواجه شد!</p>
          <p className='text-lg '>لطفا مجدد تلاش نمایید</p>
          {message && <p>{message}</p>}
        </div>
      </div>
    );
};
export default OrderDetails;
