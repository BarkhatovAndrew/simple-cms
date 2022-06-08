import Link from 'next/link';
import { FC } from 'react';
import { RightDiv, StyledContent, StyledDiv, StyledH2 } from './styles';
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
          <StyledH2>{post.title}</StyledH2>
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
