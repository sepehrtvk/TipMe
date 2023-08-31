import { NextResponse } from "next/server";

import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../helpers/db-util";

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

  //validate inputs

  const newTipOay = {
    amount,
    name,
    phone,
    cafeName,
  };

  let result;

  try {
    result = await insertDocument(client, "paytips", newTipOay);
    newTipOay._id = result.insertedId;
    return NextResponse.json(
      {
        message: "انعام با موفقیت پرداخت شد.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Inserting failed!" }, { status: 500 });
  }

  client.close();
}

// export default handler;
