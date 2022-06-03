import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Comments from '../../components/Comments';
import { MongoClient } from 'mongodb';
import { connectDatabase, findDatabase } from '../../helpers/database';

interface IProps {
  post: string;
}

const PostPage = ({ post }: IProps) => {
  const singlePost = JSON.parse(post);
  return (
    <>
      <h1>{singlePost.title}</h1>
      <ReactMarkdown>{singlePost.text}</ReactMarkdown>
      <Comments />
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.postId;
  const url = process.env.DB_URL as string;
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db('zhaloby');
  const collection = db.collection('zhaloby');
  const post = await collection.findOne();

  return {
    props: {
      post: JSON.stringify(post),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const errorReturn = {
    paths: [],
    fallback: false,
  };
  let client;
  let response;
  try {
    client = await connectDatabase();
  } catch (e) {
    console.log((e as Error).message);
    return errorReturn;
  }
  try {
    response = await findDatabase(client, 'zhaloby');
  } catch (e) {
    console.log((e as Error).message);
    return errorReturn;
  }
  if (response) {
    const paths = response.map((post) => ({
      params: { postId: post._id.toJSON() },
    }));
    return {
      paths,
      fallback: false,
    };
  } else {
    return errorReturn;
  }
};
