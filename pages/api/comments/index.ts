import { NextApiRequest, NextApiResponse } from 'next';
import {
  connectDatabase,
  findDatabase,
  insertDatabase,
} from '../../../helpers/database';
import { ObjectId } from 'bson';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    let client;
    let response;
    try {
      client = await connectDatabase();
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
      return;
    }
    try {
      response = await findDatabase(client, 'comments');
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
      return;
    }
  }
  if (req.method === 'POST') {
    const { name, text, postId } = req.body;
    let client;
    let response;
    try {
      client = await connectDatabase();
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
      return;
    }
    try {
      response = await insertDatabase(client, 'comments', {
        name,
        text,
        postId: new ObjectId(postId),
      });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
      return;
    }
    res.status(201).json(response);
  }
};

export default handler;