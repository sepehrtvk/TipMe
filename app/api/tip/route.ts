import { NextResponse } from "next/server";

import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../helpers/db-util";
import { v4 as uuidv4 } from "uuid";
import { PAYSTAR_SECRET } from "@/app/constants/secret";
var crypto = require("crypto");

export async function GET(Request: Request) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    const documents = await getAllDocuments(client, "paytips", { _id: -1 });
    return NextResponse.json({ paytips: documents });
  } catch (error) {
    console.log(error);
    //   res.status(500).json({ message: "Getting comments failed." });
  }

  client.close();
}

export async function POST(Request: Request) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return NextResponse.json({ message: "Connecting to the database failed!" });
    return;
  }

  const { amount, name, phone, cafeName } = await Request.json();

  const order_id = uuidv4();
  const callback_url = "https://tipme.works/orderDetails";

  let hmac = crypto.createHmac("sha512", PAYSTAR_SECRET);

  let dataHmac = hmac.update(`${amount}#${order_id}#${callback_url}`);

  let gen_hmac = dataHmac.digest("hex");

  const res = await fetch("https://core.paystar.ir/api/pardakht/create", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer x7gkdk57nymxwn",
    },
    body: JSON.stringify({
      amount: amount,
      order_id: order_id,
      callback: callback_url,
      sign: gen_hmac,
      callback_method: 1,
    }),
  });

  const data = await res.json();

  const newTipOay = {
    amount,
    name,
    phone,
    cafeName,
    order_id,
    status: 0,
  };

  let result;

  try {
    result = await insertDocument(client, "paytips", newTipOay);
    // newTipOay._id = result.insertedId;
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

  // client.close();
  return NextResponse.json({ data: data });
}

// export default handler;
