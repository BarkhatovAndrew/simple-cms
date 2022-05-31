import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
`;

interface IProps {
  children: ReactNode;
}

const Container: FC<IProps> = (props) => {
  return <StyledContainer {...props} />;
};

export default Container;
