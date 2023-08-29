import PN from "persian-number";

export const toLocaleCurrencyString = (
  price,
  displayCurrency,
  displayToman
) => {
  if (!price && price !== 0) {
    return "---";
  }
  price = Math.ceil(price);
  return (
    new Intl.NumberFormat("fa-IR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) +
    (displayCurrency ? (displayToman ? " تومان" : " ریال") : "")
  );
};

export const toLocaleNumberString = (number, useGrouping) => {
  if (!useGrouping) {
    useGrouping = false;
  }
  if (!number && number !== 0) {
    return "---";
  }

  return new Intl.NumberFormat("fa-IR", {
    style: "decimal",
    minimumFractionDigits: 0,
    useGrouping,
  }).format(number);
};

//change persian numbers to english

var persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];

const englishNumbers = [
  /0/g,
  /1/g,
  /2/g,
  /3/g,
  /4/g,
  /5/g,
  /6/g,
  /7/g,
  /8/g,
  /9/g,
];

export const convertNumbersToEnglish = function (str) {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

var persianNumbersArray = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
export const convertNumbersToPersian = function (str) {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str
        .replace(englishNumbers[i], persianNumbersArray[i])
        .replace(arabicNumbers[i], persianNumbersArray[i]);
    }
  }
  return str;
};

export const convertAmountToWords = (amount) => {
  return Math.floor(+amount / 10)
    ? PN.convert(Math.floor(+amount / 10)) + " تومان "
    : "";
};

export const commaSeperatorForPrice = (amount) => {
  const persianNum = amount.split("٬").join("").replace("٬", "");

  let isnum = /^\d+$/.test(convertNumbersToEnglish(persianNum));

  if (persianNum && isnum) return convertNumbersToEnglish(persianNum);
  else return 0;
};
