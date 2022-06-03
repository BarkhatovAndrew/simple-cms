import React, { FC } from 'react';
import { StyledHr } from '../Header/styles';
import { StyledFooter } from './styles';

const Footer: FC = () => {
  return (
    <StyledFooter>
      <StyledHr />
      <p>Просто футер</p>
    </StyledFooter>
  );
};

export default Footer;
