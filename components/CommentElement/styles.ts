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
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  .reply-text {
    color: ${({ theme }) => (theme as ITheme).color.secondary};
    cursor: pointer;
    transition: 100ms;

    &:hover {
      color: green;
    }
  }

  p {
    margin: 5px;
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
