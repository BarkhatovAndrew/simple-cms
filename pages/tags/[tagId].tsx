import { useRouter } from 'next/router';

const TagPage = () => {
  const router = useRouter();
  const { tagId } = router.query;
  return <h1>Все статьи по тегу: {tagId}</h1>;
};

export default TagPage;
