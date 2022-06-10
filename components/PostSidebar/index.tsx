import React, { FC, useEffect, useState } from 'react';
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
import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';

interface IProps {
  post: IPost;
}

const PostSidebar: FC<IProps> = ({ post }) => {
  const date = new Date(post.date).toLocaleDateString('ru-RU');
  const tags = post.tags.split(',');
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const fetcher = (url: string) => axios(url).then((res) => res.data);
  const { data } = useSWR(`/api/comments/${post._id}`, fetcher);

  useEffect(() => {
    if (data) {
      setCommentsCount(data.comments.length);
    }
  }, [data]);

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
              return (
                <span key={tag}>
                  <Link href={`/tags/${tag.trim().toLowerCase()}`}>{tag}</Link>,
                </span>
              );
            }
            return (
              <span key={tag}>
                <Link href={`/tags/${tag.trim().toLowerCase()}`}>{tag}</Link>
              </span>
            );
          })}
        </p>
      </StyledTags>
      <CommentsBlock>
        <ImageWrapper>
          <Image src={commentLogo} alt="comments-logo" layout="responsive" />
        </ImageWrapper>
        <p>{commentsCount} комментариев</p>
      </CommentsBlock>
    </LeftDiv>
  );
};

export default PostSidebar;
