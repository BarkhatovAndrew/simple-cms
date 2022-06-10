import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, findDatabase } from '../../../helpers/database';
import { ObjectId } from 'bson';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { commentId } = req.query;
    let client;
    let comments;
    try {
      client = await connectDatabase();
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
      return;
    }
    try {
      comments = await findDatabase(client, 'comments', {
        postId: new ObjectId(commentId as string),
      });
      res.status(200).json({ comments });
      return;
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    } finally {
      client.close();
    }
  }
};

export default handler;
