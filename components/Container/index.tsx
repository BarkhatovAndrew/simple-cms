import { FC, ReactNode } from 'react';
import { StyledContainer } from './styles';

interface IProps {
  children: ReactNode;
}

const Container: FC<IProps> = (props) => {
  return <StyledContainer {...props} />;
};

export default Container;
