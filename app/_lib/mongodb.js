import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;

// In development
if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global;

  if (!globalWithMongo._mongoClient)
    globalWithMongo._mongoClient = new MongoClient(uri);

  client = globalWithMongo._mongoClient;
}

// In production
// client = new MongoClient(uri);

export default client;
