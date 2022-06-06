import React, { FC } from 'react';
import {
  CommentsBlock,
  ImageWrapper,
  LeftDiv,
  StyledTags,
} from '../PostElement/styles';
import Image from 'next/image';
import folder from '../../assets/icons/folder.svg';
import commentLogo from '../../assets/icons/comments.svg';
import { IPost } from '../../types/posts';

interface IProps {
  post: IPost;
}

const PostSidebar: FC<IProps> = ({ post }) => {
  const date = new Date(post.date).toLocaleDateString('ru-RU');
  const tags = post.tags.split(',');
  return (
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
  );
};

export default PostSidebar;
