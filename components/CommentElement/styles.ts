import styled from 'styled-components';
import { ITheme } from '../../theme';

export const StyledComment = styled.div`
  display: flex;
  border-bottom: 1px solid #d2d2d2;
  justify-content: space-between;

  .comment {
    word-wrap: anywhere;
  }

  .reply {
    margin-left: 50px;
  }
`;

export const StyledRight = styled.div`
  display: flex;
  align-items: flex-end;

  p {
    cursor: pointer;
    transition: 100ms;

    &:hover {
      color: ${({ theme }) => (theme as ITheme).color.secondary};
    }
  }
`;

export const Replies = styled.div`
  margin-left: 50px;
  display: flex;
  flex-direction: column;

  .reply {
    border-bottom: 1px solid #d2d2d2;
  }
`;
