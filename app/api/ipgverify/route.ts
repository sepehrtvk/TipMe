import { PAYSTAR_SECRET } from "@/app/constants/secret";
import { connectDatabase, updateDocument } from "@/app/helpers/db-util";
import { NextResponse } from "next/server";

var crypto = require("crypto");

export async function POST(Request: Request) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return NextResponse.json({ message: "Connecting to the database failed!" });
    return;
  }

  const { amount, ref_num, card_number, tracking_code, order_id } =
    await Request.json();

  let hmac = crypto.createHmac("sha512", PAYSTAR_SECRET);

  let dataHmac = hmac.update(
    `${amount}#${ref_num}#${card_number}#${tracking_code}`
  );

  let gen_hmac = dataHmac.digest("hex");

  const res = await fetch("https://core.paystar.ir/api/pardakht/verify", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer x7gkdk57nymxwn",
    },
    body: JSON.stringify({
      amount: amount,
      ref_num: ref_num,
      sign: gen_hmac,
    }),
  });

  const data = await res.json();

  let result;

  try {
    result = await updateDocument(client, "paytips", order_id);
    // newTipOay._id = result.insertedId;
    console.log(result);
    // return NextResponse.json(
    //   {
    //     message: "انعام با موفقیت پرداخت شد.",
    //   },
    //   { status: 201 }
    // );
  } catch (error) {
    console.log(error);
    // return NextResponse.json({ message: "Inserting failed!" }, { status: 500 });
  }
  return NextResponse.json({ data: data });

  // client.close();
}
