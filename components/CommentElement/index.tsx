import { FC, RefObject } from 'react';
import { IComment } from '../../types/comments';
import { StyledComment, StyledRight } from './styles';
import { ObjectId } from 'bson';

interface IProps {
  comment: IComment;
  textRef: RefObject<HTMLTextAreaElement>;
  setReplyHandler: (reply: ObjectId) => void;
}

const Index: FC<IProps> = ({ comment, textRef, setReplyHandler }) => {
  const replyHandler = () => {
    textRef.current!.value = comment.name + ', ';
    textRef.current!.focus();
    setReplyHandler(comment._id);
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
