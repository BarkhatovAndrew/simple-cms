import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Comments from '../../components/CommentsList';
import { connectDatabase, findDatabase } from '../../helpers/database';
import { IComment } from '../../types/comments';
import PostSidebar from '../../components/PostSidebar';
import { RightDiv, StyledDiv } from '../../components/PostElement/styles';
import ShareButtons from '../../components/ShareButtons';

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
      <StyledDiv>
        <PostSidebar post={singlePost} />

        <RightDiv>
          <h1>{singlePost.title}</h1>
          <ReactMarkdown>{singlePost.text}</ReactMarkdown>
        </RightDiv>
      </StyledDiv>
      <ShareButtons />
      <Comments comments={comments} postId={singlePost._id} />
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const client = await connectDatabase();
    const db = client.db('zhaloby');
    const posts = db.collection('posts');
    const post = await posts.findOne();
    const comments = await findDatabase(client, 'comments', {
      postId: post!._id,
    });
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
    response = await findDatabase(client, 'posts');
  } catch (e) {
    console.log((e as Error).message);
    return errorReturn;
  }
  if (response) {
    const paths = response.map((post) => ({
      params: { postId: post.url },
    }));
    return {
      paths,
      fallback: false,
    };
  } else {
    return errorReturn;
  }
};
