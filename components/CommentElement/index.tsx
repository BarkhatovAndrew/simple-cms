import { FC } from 'react';
import { IComment } from '../../types/comments';
import { StyledComment, StyledRight } from './styles';

interface IProps {
  comment: IComment;
}

const Index: FC<IProps> = ({ comment }) => {
  return (
    <StyledComment>
      <div>
        <p>
          <strong>{comment.name}</strong>:
        </p>
        <p>{comment.text}</p>
      </div>
      <StyledRight>
        <p>Ответить</p>
      </StyledRight>
    </StyledComment>
  );
};

export default Index;
