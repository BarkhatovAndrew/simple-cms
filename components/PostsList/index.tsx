import PostElement from '../PostElement';
import { IPost } from '../../types/posts';

interface IProps {
  posts: IPost[];
}

const PostsList = ({ posts }: IProps) => {
  return (
    <>
      {posts.map((post) => (
        <PostElement post={post} key={post._id} />
      ))}
    </>
  );
};

export default PostsList;
