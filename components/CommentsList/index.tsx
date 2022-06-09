import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { StyledError, StyledForm } from './styles';
import { IComment } from '../../types/comments';
import axios from 'axios';
import useSWR from 'swr';
import { ObjectId } from 'bson';
import CommentElement from '../CommentElement';
import { sendComment } from '../../services/sendComment';

interface IProps {
  comments: IComment[];
  postId: string;
}

const Comments: FC<IProps> = ({ comments, postId }) => {
  const [commentsList, setCommentsList] = useState<IComment[]>(comments);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [reply, setReply] = useState<null | ObjectId>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data } = useSWR('/api/comments', fetcher);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const name = nameRef.current!.value;
    const text = textRef.current!.value;
    const sendConfig: {
      name: string;
      text: string;
      postId: ObjectId;
      replyId?: ObjectId;
    } = {
      name,
      text,
      postId: new ObjectId(postId),
    };
    if (reply) {
      sendConfig.replyId = reply;
    }

    const { response, validateResponse } = await sendComment(sendConfig);

    if (response) {
      setCommentsList([
        ...commentsList,
        {
          _id: new ObjectId(response.data.insertedId),
          name: nameRef.current!.value,
          text: textRef.current!.value,
          postId: new ObjectId(postId),
          // TODO: добавить replyId сюда
        },
      ]);
      nameRef.current!.value = '';
      textRef.current!.value = '';
      setReply(null);
    } else {
      setErrorMsg(validateResponse);
    }
  };

  const setReplyHandler = (reply: ObjectId) => {
    setReply(reply);
  };

  useEffect(() => {
    if (data) {
      setCommentsList(data);
    }
  }, [data]);

  return (
    <div>
      <h3>Комментарии</h3>
      {errorMsg && <StyledError>{errorMsg}</StyledError>}
      <StyledForm onSubmit={submitHandler}>
        <label htmlFor="name">Введите ваше имя:</label>
        <input type="text" id="name" ref={nameRef} />
        <label htmlFor="text">Введите ваше сообщение:</label>
        <textarea id="text" rows={5} ref={textRef} />
        <button type="submit">Отправить</button>
      </StyledForm>
      {commentsList.map((comment: IComment) => (
        <CommentElement
          key={JSON.stringify(comment._id)}
          comment={comment}
          textRef={textRef}
          setReplyHandler={setReplyHandler}
        />
      ))}
    </div>
  );
};

export default Comments;
