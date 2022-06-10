import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Comments from '../../components/CommentsList';
import { connectDatabase, findDatabase } from '../../helpers/database';
import { IComment } from '../../types/comments';
import PostSidebar from '../../components/PostSidebar';
import { RightDiv, StyledDiv } from '../../components/PostElement/styles';
import ShareButtons from '../../components/ShareButtons';
import { IPost } from '../../types/posts';
import { ObjectId } from 'bson';

interface IProps {
  post: IPost;
  comments: IComment[];
  error?: string;
}

const PostPage = ({ post, comments, error }: IProps) => {
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <StyledDiv>
        <PostSidebar post={post} />

        <RightDiv>
          <h1>{post.title}</h1>
          <ReactMarkdown>{post.text}</ReactMarkdown>
        </RightDiv>
      </StyledDiv>
      <ShareButtons />
      <Comments comments={comments} postId={new ObjectId(post._id)} />
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const client = await connectDatabase();
    const db = client.db('zhaloby');
    const post = await db.collection('posts').findOne();
    const comments = await findDatabase(client, 'comments', {
      postId: post!._id,
    });
    const postProps = {
      ...post,
      _id: post!._id.toJSON(),
    };
    const commentsProps = comments.map((comment) => {
      if (comment.replyId) {
        return {
          ...comment,
          _id: comment._id.toJSON(),
          date: comment.date.toJSON(),
          postId: comment.postId.toString(),
          replyId: comment.replyId.toJSON(),
        };
      }
      return {
        ...comment,
        _id: comment._id.toJSON(),
        date: comment.date.toString(),
        postId: comment.postId.toJSON(),
      };
    });
    return {
      props: {
        post: postProps,
        comments: commentsProps,
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
    return errorReturn;
  }
  try {
    response = await findDatabase(client, 'posts');
  } catch (e) {
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
