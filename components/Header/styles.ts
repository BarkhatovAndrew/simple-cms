import styled from 'styled-components';
import { ITheme } from '../../theme';

export const StyledDiv = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

export const StyledH1 = styled.h1`
  font-size: 60px;
  margin: 40px 0 20px;
  text-align: center;
  font-family: Tiro, sans-serif;
  color: ${({ theme }) => (theme as ITheme).color.main};
`;

export const StyledH2 = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  text-align: center;
  font-family: Tiro, sans-serif;
  color: ${({ theme }) => (theme as ITheme).color.main};
`;

export const StyledHr = styled.div`
  border-bottom: 1px solid #a4a4a4;
`;
