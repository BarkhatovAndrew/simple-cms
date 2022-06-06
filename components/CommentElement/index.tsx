import { FC } from 'react';
import { IComment } from '../../types/comments';
import { StyledComment, StyledLeft, StyledRight } from './styles';

interface IProps {
  comment: IComment;
}

const Index: FC<IProps> = ({ comment }) => {
  return (
    <StyledComment>
      <StyledLeft>
        <p>
          <strong>{comment.name}</strong>:
        </p>
        <p>{comment.text}</p>
      </StyledLeft>
      <StyledRight>
        <p>Ответить</p>
      </StyledRight>
    </StyledComment>
  );
};

export default Index;
