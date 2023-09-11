import { toLocaleCurrencyString } from "@/app/common/Localization";
import { WageCostPercent } from "@/app/constants";
import React from "react";

const CafeDetails = ({ cafeDetails }: any) => {
  return (
    <div className='bg-blue-300 p-8 shadow-sm rounded-md'>
      <div className='flex flex-col justify-center items-center'>
        <div className='mb-8'>
          <p className='font-bold text-xl'>{cafeDetails._id}</p>
        </div>
        <div className='text-slate-600'>
          <div className='mb-4'>
            <span>مجموع انعام ها: </span>
            <span>
              {toLocaleCurrencyString(cafeDetails.totalAmount / 10, true, true)}
            </span>
          </div>
          <div className='mb-4 text-green-600 '>
            <span>کارمزد تیپ می: </span>
            <span className='font-bold text-xl'>
              {toLocaleCurrencyString(
                ((cafeDetails.totalAmount / 10) * WageCostPercent) / 100,
                true,
                true
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeDetails;
