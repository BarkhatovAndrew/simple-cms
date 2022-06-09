import { FC, RefObject } from 'react';
import { IComment } from '../../types/comments';
import { StyledComment, StyledRight } from './styles';

interface IProps {
  comment: IComment;
  nameRef: RefObject<HTMLInputElement>;
  textRef: RefObject<HTMLTextAreaElement>;
}

const Index: FC<IProps> = ({ comment, nameRef, textRef }) => {
  const replyHandler = () => {
    textRef.current!.value = comment.name + ', ';
    textRef.current!.focus();
  };

  return (
    <StyledComment>
      <div>
        <p>
          <strong>{comment.name}</strong>:
        </p>
        <p>{comment.text}</p>
      </div>
      <StyledRight>
        <p onClick={replyHandler}>Ответить</p>
      </StyledRight>
    </StyledComment>
  );
};

export default Index;
