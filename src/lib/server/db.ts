import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("MONGODB_URI is not defined. Database features will be disabled.");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const getDb = async (): Promise<Db> => {
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (cachedDb && cachedClient) {
    return cachedDb;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db();
  return cachedDb;
};

export const closeDb = async () => {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
};
