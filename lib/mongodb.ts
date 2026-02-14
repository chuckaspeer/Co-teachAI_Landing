import { MongoClient, Db } from "mongodb";

const dbName = process.env.MONGODB_DB_OPS ?? "coteachai_ops";

function getUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable.");
  return uri;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let prodPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(getUri());
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }
  if (!prodPromise) {
    const client = new MongoClient(getUri());
    prodPromise = client.connect();
  }
  return prodPromise;
}

export async function getDb(): Promise<Db> {
  const c = await getClientPromise();
  return c.db(dbName);
}

export async function getLeadsCollection() {
  const db = await getDb();
  return db.collection<LeadDocument>("leads");
}

export type LeadDocument = {
  type: "access" | "demo";
  name: string;
  email: string;
  school?: string;
  district?: string;
  role?: string;
  message?: string;
  status: string;
  createdAt: Date;
  userAgent?: string;
  ip?: string;
};
