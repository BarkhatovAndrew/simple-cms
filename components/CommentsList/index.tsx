import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { StyledError, StyledForm } from './styles';
import { IComment } from '../../types/comments';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ObjectId } from 'bson';
import CommentElement from '../CommentElement';
import { validateComments } from '../../helpers/validateComments';

interface IProps {
  comments: IComment[];
}

const Comments: FC<IProps> = ({ comments }) => {
  const [commentsList, setCommentsList] = useState<IComment[]>(comments);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR('/api/comments', fetcher);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const name = nameRef.current!.value;
    const text = textRef.current!.value;
    const validateResponse = validateComments(name, text);
    if (validateResponse === 'Сообщение отправлено') {
      const response = await axios.post('/api/comments', {
        name,
        text,
        postId: router.query.postId,
      });
      setCommentsList([
        ...commentsList,
        {
          _id: new ObjectId(response.data.insertedId),
          name: nameRef.current!.value,
          text: textRef.current!.value,
          postId: router.query.postId,
        },
      ]);
      nameRef.current!.value = '';
      textRef.current!.value = '';
    } else {
      setErrorMsg(validateResponse);
    }
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
        <CommentElement key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
