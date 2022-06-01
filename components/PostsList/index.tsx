import { IPost } from '../../helpers/posts';
import Container from '../Container';
import styled from 'styled-components';
import Link from 'next/link';

interface IProps {
  posts: IPost[];
}

const StyledLi = styled.li`
  list-style: none;
  cursor: pointer;
`;

const PostsList = ({ posts }: IProps) => {
  return (
    <Container>
      {posts.map((post) => (
        <Link href={`/posts/${post._id}`} key={post._id}>
          <StyledLi>
            <h2>{post.title}</h2>
            <p>{post.text.slice(0, 500) + '...'}</p>
          </StyledLi>
        </Link>
      ))}
    </Container>
  );
};

export default PostsList;
