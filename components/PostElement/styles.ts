import styled from 'styled-components';
import { ITheme } from '../../theme';

export const StyledLi = styled.li`
  list-style: none;
  cursor: pointer;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      color: ${({ theme }) => (theme as ITheme).color.secondary};
    }
  }

  h2 {
    font-size: 30px;
    color: ${({ theme }) => (theme as ITheme).color.secondary};
    cursor: pointer;
  }
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
  display: flex;
  flex-direction: column;
  margin-top: 28px;

  p {
    margin: 8px;
  }
`;

export const StyledContent = styled.div`
  display: flex;
`;
