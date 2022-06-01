import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const postId = req.query.postId;
    const client = new MongoClient(
      'mongodb+srv://andrew:Logitech1994@cluster0.7r57lnf.mongodb.net/?retryWrites=true&w=majority'
    );
    await client.connect();
    const db = client.db('zhaloby');
    const document = await db
      .collection('zhaloby')
      .find({
        _id: new ObjectId(postId as string),
      })
      .toArray();
    await client.close();
    res.status(200).json({ document });
  }
};

export default handler;
