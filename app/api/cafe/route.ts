import { connectDatabase, getAllCafeTips } from "@/app/helpers/db-util";
import { NextResponse } from "next/server";

export async function GET(Request: Request) {
  const cafeName = Request.url.split("?")[1].split("=")[1];

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    const documents = await getAllCafeTips(
      client,
      "paytips",
      { _id: -1 },
      cafeName
    );
    return NextResponse.json({ paytips: documents });
  } catch (error) {
    console.log(error);
    //   res.status(500).json({ message: "Getting comments failed." });
  }

  client.close();
}
