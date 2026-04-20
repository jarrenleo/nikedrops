import { setServers } from "node:dns/promises";
import { MongoClient } from "mongodb";

setServers(["1.1.1.1", "8.8.8.8"]);

const client = new MongoClient(process.env.MONGODB_URI);

export default client;
