import Link from 'next/link';
import { FC } from 'react';
import { RightDiv, StyledContent, StyledDiv } from './styles';
import { IPost } from '../../types/posts';
import PostSidebar from '../PostSidebar';

interface IProps {
  post: IPost;
}

const PostElement: FC<IProps> = ({ post }) => {
  return (
    <StyledDiv key={post._id}>
      <PostSidebar post={post} />

      <RightDiv>
        <Link href={`/posts/${post._id}`}>
          <h2>{post.title}</h2>
        </Link>
        <StyledContent>
          <p>{post.text.slice(0, 500) + '... '}</p>
        </StyledContent>
        <Link href={`/posts/${post._id}`}>
          <span>Читать далее...</span>
        </Link>
      </RightDiv>
    </StyledDiv>
  );
};

export default PostElement;
