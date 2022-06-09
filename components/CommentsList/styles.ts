import styled from 'styled-components';
import { ITheme } from '../../theme';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  textarea {
    resize: none;
    width: 500px;
  }

  input {
    line-height: 30px;
    margin-bottom: 8px;
  }

  button {
    width: 140px;
    align-self: center;
    margin-top: 16px;
    font-size: ${({ theme }) => (theme as ITheme).size.f1};
    line-height: 36px;
    border: none;
    border-radius: 5px;
    background-color: #4285f4;
    cursor: pointer;
    color: white;
    transition: 100ms;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #3977dc;
    }
  }

  input,
  textarea {
    border: 1px solid #b1b1b1;
    border-radius: 5px;
    font-size: ${({ theme }) => (theme as ITheme).size.f1};
    font-family: Tiro, serif;
  }
`;

export const StyledError = styled.p`
  color: ${({ theme }) => (theme as ITheme).color.secondary};
`;

export const StyledWrapper = styled.div`
  max-width: 500px;
`;
