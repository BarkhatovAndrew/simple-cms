import PostsList from '../components/PostsList';
import { GetStaticProps } from 'next';
import { connectDatabase, findDatabase } from '../helpers/database';
import { IPost } from '../types/posts';

interface IProps {
  posts: IPost[];
  error?: string;
}

const HomePage = ({ posts, error }: IProps) => {
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <PostsList posts={posts} />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  let client;
  let response;
  try {
    client = await connectDatabase();
  } catch (e) {
    console.log((e as Error).message);
    return {
      props: {
        error: 'Не могу подключиться к базе данных',
      },
    };
  }
  try {
    response = await findDatabase(client, 'posts');
  } catch (e) {
    console.log((e as Error).message);
  } finally {
    await client.close();
  }
  if (response) {
    const posts = response.map((item) => ({
      ...item,
      _id: item._id.toJSON(),
    }));
    return {
      props: {
        posts,
      },
      revalidate: 3000,
    };
  } else {
    return {
      props: {
        error: 'Нет ответа от базы данных',
      },
    };
  }
};
