import styled from 'styled-components';
import { ITheme } from '../../theme';

const StyledDiv = styled.div`
  width: 1000px;
`;

const StyledH1 = styled.h1`
  font-size: 60px;
  margin: 40px 0 20px;
  text-align: center;
  font-family: Tiro, sans-serif;
  color: ${({ theme }) => (theme as ITheme).color.main};
`;

const StyledH2 = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  text-align: center;
  font-family: Tiro, sans-serif;
  color: ${({ theme }) => (theme as ITheme).color.main};
`;

const StyledHr = styled.div`
  border-bottom: 1px solid #a4a4a4;
`;

const Header = () => {
  return (
    <StyledDiv>
      <StyledH1>ZHALOBY.COM</StyledH1>
      <StyledH2>Напишите жалобу онлайн</StyledH2>
      <StyledHr />
    </StyledDiv>
  );
};

export default Header;
