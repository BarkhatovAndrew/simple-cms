import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check for secret to confirm this is a valid request
  const { secret, path } = req.query;
  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    console.log('errr');
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.unstable_revalidate(path as string);
    console.log('tut');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
};

export default handler;
