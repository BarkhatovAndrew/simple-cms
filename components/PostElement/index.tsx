import Link from 'next/link';
import { FC } from 'react';
import { LeftDiv, RightDiv, StyledContent, StyledDiv } from './styles';
import { IPost } from '../../types/posts';

interface IProps {
  post: IPost;
}

const PostElement: FC<IProps> = ({ post }) => {
  const date = new Date(post.date).toLocaleDateString('ru-RU');
  const tags = post.tags.split(',');
  return (
    <StyledDiv key={post._id}>
      <LeftDiv>
        <p>{date}</p>
        <p>
          {tags.map((tag, i) => {
            if (i !== tags.length - 1) {
              return <span key={tag}>{tag},</span>;
            }
            return <span key={tag}>{tag}</span>;
          })}
        </p>
        <p>0 комментариев</p>
      </LeftDiv>

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
