import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Comments from '../../components/Comments';
import { connectDatabase, findDatabase } from '../../helpers/database';
import { IComment } from '../../types/comments';

interface IProps {
  post: string;
  comments: IComment[];
  error?: string;
}

const PostPage = ({ post, comments, error }: IProps) => {
  const singlePost = JSON.parse(post);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>{singlePost.title}</h1>
      <ReactMarkdown>{singlePost.text}</ReactMarkdown>
      <Comments comments={comments} />
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const id = context.params!.postId;
    const client = await connectDatabase();
    const db = client.db('zhaloby');
    const zhaloby = db.collection('zhaloby');
    const commentsList = db.collection('comments');
    const post = await zhaloby.findOne();
    const comments = await commentsList.find().toArray();
    return {
      props: {
        post: JSON.stringify(post),
        comments: comments.map((comment) => ({
          ...comment,
          _id: comment._id.toJSON(),
          postId: comment.postId.toJSON(),
        })),
      },
      revalidate: 3000,
    };
  } catch (e) {
    return {
      props: {
        error: (e as Error).message,
      },
    };
  }
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
