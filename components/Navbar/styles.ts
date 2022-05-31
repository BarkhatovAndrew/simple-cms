import styled from 'styled-components';
import { ITheme } from '../../theme';

export const StyledNavbar = styled.nav`
  background-color: #404040;
  display: flex;
  justify-content: center;
  height: 45px;

  ul {
    display: flex;
    list-style: none;
    align-items: center;

    li {
      color: white;
      padding: 0 15px;
      font-size: ${({ theme }) => (theme as ITheme).size.f1};

      a {
        transition: 0.2s;

        &:hover {
          color: #b8b8b8;
        }
      }
    }
  }
`;
