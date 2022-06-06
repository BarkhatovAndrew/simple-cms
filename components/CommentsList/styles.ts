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
    width: 40%;
    align-self: center;
    margin-top: 8px;
    font-size: ${({ theme }) => (theme as ITheme).size.f1};
    line-height: 30px;
    border: none;
    border-radius: 5px;
    transition: 100ms;
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
