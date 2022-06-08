import styled from 'styled-components';
import { ITheme } from '../../theme';

export const StyledDiv = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

export const StyledH1 = styled.h1`
  font-size: ${({ theme }) => (theme as ITheme).size.h1};
  margin: 40px 0 20px;
  text-align: center;
  font-family: Tiro, sans-serif;
  color: ${({ theme }) => (theme as ITheme).color.main};
`;

export const StyledH2 = styled.h2`
  font-size: ${({ theme }) => (theme as ITheme).size.h2};
  margin-top: 20px;
  text-align: center;
  font-family: Tiro, sans-serif;
  color: ${({ theme }) => (theme as ITheme).color.main};
`;

export const StyledHr = styled.div`
  border-bottom: 1px solid #d4d4d4;
`;
