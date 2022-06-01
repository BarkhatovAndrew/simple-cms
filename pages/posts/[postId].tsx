import React from 'react';
import Container from '../../components/Container';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MongoClient } from 'mongodb';

interface IProps {
  post: string;
}

const PostPage = ({ post }: IProps) => {
  const singlePost = JSON.parse(post);
  return (
    <Container>
      <h1>{singlePost.title}</h1>
      <p>{singlePost.text}</p>
    </Container>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.postId;
  const url =
    'mongodb+srv://andrew:Logitech1994@cluster0.7r57lnf.mongodb.net/?retryWrites=true&w=majority';
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
  const url =
    'mongodb+srv://andrew:Logitech1994@cluster0.7r57lnf.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db('zhaloby');
  const collection = db.collection('zhaloby');
  const posts = await collection.find().toArray();
  const paths = posts.map((post) => ({
    params: { postId: post._id.toJSON() },
  }));
  return {
    paths,
    fallback: false,
  };
};
