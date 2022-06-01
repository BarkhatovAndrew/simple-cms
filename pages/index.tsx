import Container from '../components/Container';
import Header from '../components/Header';
import PostsList from '../components/PostsList';
import { GetStaticProps } from 'next';
import { IPost } from '../helpers/posts';
import { MongoClient } from 'mongodb';

interface IProps {
  posts: IPost[];
}

const HomePage = ({ posts }: IProps) => {
  return (
    <Container>
      <Header />
      <PostsList posts={posts} />
    </Container>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const client = new MongoClient(
    'mongodb+srv://andrew:Logitech1994@cluster0.7r57lnf.mongodb.net/?retryWrites=true&w=majority'
  );
  await client.connect();
  const db = client.db('zhaloby');
  const result = await db.collection('zhaloby').find().toArray();
  const posts = result.map((item) => ({ ...item, _id: item._id.toJSON() }));
  await client.close();
  return {
    props: {
      posts,
    },
  };
};
