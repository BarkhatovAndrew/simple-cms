import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { StyledError, StyledForm, StyledWrapper } from './styles';
import { IComment } from '../../types/comments';
import { ObjectId } from 'bson';
import CommentElement from '../CommentElement';
import { sendComment } from '../../services/sendComment';
import axios from 'axios';
import useSWR from 'swr';
import { forceRevalidate } from '../../services/forceRevalidate';

interface IProps {
  comments: IComment[];
  postId: ObjectId;
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
      await forceRevalidate(
        process.env.NEXT_PUBLIC_REVALIDATE_TOKEN!,
        window.location.pathname
      );
      setCommentsList([
        ...commentsList,
        {
          _id: new ObjectId(response.data.insertedId),
          name: nameRef.current!.value,
          text: textRef.current!.value,
          postId: new ObjectId(postId),
          date: new Date().toLocaleString('ru-RU'),
          replyId: reply,
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
    <StyledWrapper>
      <h3>??????????????????????</h3>
      {errorMsg && <StyledError>{errorMsg}</StyledError>}
      <StyledForm onSubmit={submitHandler}>
        <label htmlFor="name">?????????????? ???????? ??????:</label>
        <input type="text" id="name" ref={nameRef} />
        <label htmlFor="text">?????????????? ???????? ??????????????????:</label>
        <textarea id="text" rows={5} ref={textRef} />
        <button type="submit">??????????????????</button>
      </StyledForm>
      {commentsList
        .filter((comment) => !comment.replyId)
        .map((comment: IComment) => (
          <CommentElement
            key={JSON.stringify(comment._id)}
            comment={comment}
            replies={comments.filter(
              (commentEl) =>
                commentEl.replyId && comment._id === commentEl.replyId
            )}
            textRef={textRef}
            setReplyHandler={setReplyHandler}
          />
        ))}
    </StyledWrapper>
  );
};

export default Comments;
