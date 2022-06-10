import { FC, RefObject } from 'react';
import { IComment } from '../../types/comments';
import { Replies, StyledComment, StyledRight } from './styles';
import { ObjectId } from 'bson';

interface IProps {
  comment: IComment;
  textRef: RefObject<HTMLTextAreaElement>;
  setReplyHandler: (reply: ObjectId) => void;
  replies: IComment[];
}

const Index: FC<IProps> = ({ comment, textRef, setReplyHandler, replies }) => {
  const date = new Date(comment.date).toLocaleString('ru-RU');

  const replyHandler = () => {
    textRef.current!.value = comment.name + ', ';
    textRef.current!.focus();
    setReplyHandler(comment._id);
  };

  return (
    <>
      <StyledComment>
        <div className="comment">
          <p>
            <strong>{comment.name}</strong>:
          </p>
          <p>{comment.text}</p>
        </div>
        <StyledRight>
          <p>{date}</p>
          <p className="reply-text" onClick={replyHandler}>
            Ответить
          </p>
        </StyledRight>
      </StyledComment>
      <Replies>
        {replies.length !== 0
          ? replies.map((reply) => (
              <div className="reply" key={JSON.stringify(reply._id)}>
                <p>
                  <strong>{reply.name}</strong>:
                </p>
                <p>{reply.text}</p>
              </div>
            ))
          : null}
      </Replies>
    </>
  );
};

export default Index;
