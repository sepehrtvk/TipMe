import {
  connectDatabase,
  getAllCafeTips,
  getAllDocumentsAggregate,
} from "@/app/helpers/db-util";
import { NextResponse } from "next/server";

export async function GET() {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    const documents = await getAllDocumentsAggregate(client, "paytips");

    return NextResponse.json({ adminTips: documents });
  } catch (error) {
    console.log(error);
    //   res.status(500).json({ message: "Getting comments failed." });
  }

  client.close();
}
