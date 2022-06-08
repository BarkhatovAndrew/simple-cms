import { StyledDiv, StyledH1, StyledH2, StyledHr } from './styles';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <StyledDiv>
      {router.asPath === '/' ? (
        <StyledH1>ZHALOBY.COM</StyledH1>
      ) : (
        <StyledH1 as="h2">ZHALOBY.COM</StyledH1>
      )}
      <StyledH2>Напишите жалобу онлайн</StyledH2>
      <StyledHr />
    </StyledDiv>
  );
};

export default Header;
