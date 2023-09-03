"use client";

import {
  commaSeperatorForPrice,
  convertAmountToWords,
  convertNumbersToEnglish,
  toLocaleCurrencyString,
} from "@/app/common/Localization";
import { TIP_CONSTANTS } from "@/app/constants";
import React, { useState } from "react";

type PayTipProps = {
  cafeName: string;
};

const BtnCLass =
  "bg-slate-300 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded-md cursor-pointer duration-200 text-center";
const BtnCLassActive =
  "bg-slate-500 text-white font-bold py-2 px-4 rounded-md  text-center cursor-pointer border border-indigo-600";

export const PayTip = ({ cafeName }: PayTipProps) => {
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFromData] = useState<{
    name: string;
    phone: string;
  } | null>(null);

  const renderBox = (price: string, index: number) => {
    return (
      <span
        key={index + 1}
        className={selectedPrice == price ? BtnCLassActive : BtnCLass}
        onClick={() => setSelectedPrice(price)}>
        {toLocaleCurrencyString(price, true, true)}
      </span>
    );
  };

  const renderPriceBoxs = () => {
    return (
      <>
        <div className='grid grid-cols-2 gap-5'>
          {TIP_CONSTANTS.map((price, index) => renderBox(price, index))}

          <span
            className={
              selectedPrice == "Custom"
                ? BtnCLassActive + " col-span-2"
                : BtnCLass + " col-span-2"
            }
            onClick={() => setSelectedPrice("Custom")}>
            مبلغ دلخواه
          </span>
        </div>
      </>
    );
  };

  const renderCustomPrice = () => {
    return (
      <div className='mb-4 mt-8'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='customPrice'>
          مبلغ:
        </label>
        <input
          value={customPrice && toLocaleCurrencyString(customPrice)}
          className='shadow-sm text-left appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='customPrice'
          type='text'
          placeholder='10,000'
          onChange={(e) => {
            const englishValue = convertNumbersToEnglish(e.target.value);
            setCustomPrice(commaSeperatorForPrice(englishValue));
          }}
        />
        <p className='mt-1 text-gray-700'>
          {convertAmountToWords(customPrice + "0")}
        </p>
      </div>
    );
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const toSendData = {
      amount:
        selectedPrice == "Custom" ? +customPrice * 10 : +selectedPrice * 10,
      name: formData?.name,
      phone: formData?.phone,
      cafeName,
    };

    console.log(toSendData);

    // fetch("/api/tip", {
    //   method: "POST",
    //   body: JSON.stringify(toSendData),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     const url_pay =
    //       "https://core.paystar.ir/api/pardakht/payment?token=" +
    //       json.data.data.token;

    //     window.open(url_pay, "_self");
    //     localStorage.setItem("paymentAmount", (+selectedPrice * 10).toString());
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setIsLoading(false));
  };

  const renderForm = () => {
    return (
      <form onSubmit={submitForm} className='mt-4'>
        <div className='mb-4 mt-8'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'>
            نام و نام خانوادگی:
          </label>
          <input
            value={formData?.name}
            className='shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            onChange={(e) => {
              const value = e.target.value;
              const data = {
                name: value,
                phone: formData?.phone ? formData.phone : "",
              };
              setFromData(data);
            }}
          />
        </div>
        <div className='mb-4 mt-8'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'>
            تلفن همراه:
          </label>
          <input
            value={formData?.phone}
            className='shadow-sm text-left appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            maxLength={11}
            minLength={11}
            onChange={(e) => {
              const value = e.target.value;
              const re = /^[0-9\b]+$/;

              if (value === "" || re.test(value)) {
                const data = {
                  name: formData?.name ? formData.name : "",
                  phone: value,
                };
                setFromData(data);
              }
            }}
          />
        </div>
        <div className='mt-12 w-full'>
          <button
            disabled={!formData || isLoading}
            type='submit'
            className={
              !isLoading
                ? BtnCLassActive + " block w-full "
                : " bg-slate-200 text-white font-bold py-2 px-4 rounded-md block w-full"
            }>
            <div className='flex justify-center align-center'>
              <span>پرداخت</span>
              {isLoading && (
                <span>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      stroke-width='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                </span>
              )}
            </div>
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <p className='text-xl mb-4'>
        {`به صفحه پرداخت انعام کافه ${cafeName} خوش آمدید`}
      </p>

      <p className='text-lg mb-5 mt-16'>
        لطفا مبلغ دلخواه خود را انتخاب نمایید:
      </p>
      {renderPriceBoxs()}
      {selectedPrice == "Custom" && renderCustomPrice()}
      {selectedPrice && renderForm()}
    </div>
  );
};
