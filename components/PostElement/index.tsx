import Link from 'next/link';
import { FC } from 'react';
import {
  CommentsBlock,
  ImageWrapper,
  LeftDiv,
  RightDiv,
  StyledContent,
  StyledDiv,
  StyledTags,
} from './styles';
import { IPost } from '../../types/posts';
import folder from '../../assets/icons/folder.svg';
import commentLogo from '../../assets/icons/comments.svg';
import Image from 'next/image';

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
        <StyledTags>
          <ImageWrapper>
            <Image src={folder} alt="folder" layout="responsive" />
          </ImageWrapper>
          <p>
            {tags.map((tag, i) => {
              if (i !== tags.length - 1) {
                return <span key={tag}>{tag},</span>;
              }
              return <span key={tag}>{tag}</span>;
            })}
          </p>
        </StyledTags>
        <CommentsBlock>
          <ImageWrapper>
            <Image src={commentLogo} alt="comments-logo" layout="responsive" />
          </ImageWrapper>
          <p>0 комментариев</p>
        </CommentsBlock>
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
