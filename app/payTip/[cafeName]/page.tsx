import { CAFE_NAMES } from "@/app/constants";
import Hero from "@/components/hero";
import { PayTip } from "@/components/payTip";
import React from "react";

const PayTipPage = ({ params }: { params: { cafeName: string } }) => {
  const cafeName = params.cafeName;

  let mainContent = null;

  if (!CAFE_NAMES.includes(cafeName)) {
    mainContent = (
      <div>
        <p className='text-xl'>کافه مورد نظز در تیپ می یافت نشد!</p>
      </div>
    );
  }

  return (
    <>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
          {mainContent ? mainContent : <PayTip cafeName={cafeName} />}
        </div>
      </div>
    </>
  );
};

export default PayTipPage;
