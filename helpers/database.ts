import { MongoClient } from 'mongodb';

export type CollectionType = 'zhaloby' | 'comments';

export type FilterType = object;

export const connectDatabase = () => {
  return MongoClient.connect(process.env.DB_URL as string);
};

export const findDatabase = async (
  client: MongoClient,
  collection: CollectionType,
  filter: FilterType = {}
) => {
  const db = client.db('zhaloby');
  return await db.collection(collection).find(filter).toArray();
};

export const insertDatabase = async (
  client: MongoClient,
  collection: CollectionType,
  document: object
) => {
  const db = client.db('zhaloby');
  return await db.collection(collection).insertOne(document);
};
