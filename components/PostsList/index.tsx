import { IPost } from '../../helpers/posts';
import PostElement from '../PostElement';

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
