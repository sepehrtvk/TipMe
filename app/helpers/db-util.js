import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://sepehrtvk:Sepehrtavakoli80@cluster0.nwkuq31.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}

export async function getAllCafeTips(client, collection, sort, cafeName) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find({ cafeName: cafeName })
    .sort(sort)
    .toArray();

  return documents;
}
