import styled from 'styled-components';
import { ITheme } from '../../theme';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 1px solid #d2d2d2;

  span {
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      color: ${({ theme }) => (theme as ITheme).color.secondary};
    }
  }
`;

export const StyledH2 = styled.h2`
  font-size: ${({ theme }) => (theme as ITheme).size.h2};
  color: ${({ theme }) => (theme as ITheme).color.secondary};
  cursor: pointer;
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  span {
    align-self: flex-end;
    color: ${({ theme }) => (theme as ITheme).color.secondary};
    cursor: pointer;
  }
`;

export const LeftDiv = styled.div`
  margin-top: 20px;
`;

export const StyledContent = styled.div`
  display: flex;
`;

export const StyledTags = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  margin: 20px 0;

  p {
    margin-left: 6px;
  }
`;

export const ImageWrapper = styled.div`
  width: 20px;
`;

export const CommentsBlock = styled.div`
  display: flex;
  align-items: center;
  height: 20px;

  p {
    margin-left: 6px;
  }
`;
