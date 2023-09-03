"use client";
import React, { useEffect, useState } from "react";

type BankParams = {
  status?: string | undefined | null;
  ref_num?: string | undefined;
  order_id?: string | undefined;
  transaction_id?: string | undefined;
  card_number?: string | undefined;
  tracking_code?: string | undefined;
};

const OrderDetails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  let searchParams: BankParams = {};

  let urlString = "";
  let amountLocal: string | null = "";

  if (typeof window !== "undefined") {
    urlString = window.location.search;

    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);

    searchParams.card_number = queryString.get("card_number")?.toString();
    searchParams.status = queryString.get("status")
      ? queryString.get("status")
      : "";

    searchParams.ref_num = queryString.get("ref_num")?.toString();
    searchParams.order_id = queryString.get("order_id")?.toString();
    searchParams.tracking_code = queryString.get("tracking_code")?.toString();
    searchParams.transaction_id = queryString.get("transaction_id")?.toString();

    amountLocal = localStorage.getItem("paymentAmount");
  }

  useEffect(() => {
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
  }, []);

  if (isLoading)
    return (
      <div className='px-8 sm:px-12'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20 text-center'>
          <p className='text-xl text-slate-500'>در حال بارگذاری...</p>
        </div>
      </div>
    );

  if (searchParams.status && +searchParams.status > 0)
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
