import 'dotenv/config';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
mongod.getInstanceInfo(); // return Object with instance data

const connect = async () => {
  const uri = await mongod.getConnectionString();
  mongoose.connect(uri, { useNewUrlParser: true });
};

connect();
