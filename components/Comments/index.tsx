import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { StyledForm } from './styles';
import { IComment } from '../../types/comments';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ObjectId } from 'bson';

interface IProps {
  comments: IComment[];
}

const Comments: FC<IProps> = ({ comments }) => {
  const [commentsList, setCommentsList] = useState<IComment[]>(comments);
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR('/api/comments', fetcher);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const response = await axios.post('/api/comments', {
      name: nameRef.current!.value,
      text: textRef.current!.value,
      postId: router.query.postId,
    });
    console.log(response.data);
    setCommentsList([
      ...commentsList,
      {
        _id: new ObjectId(response.data.insertedId),
        name: nameRef.current!.value,
        text: textRef.current!.value,
        postId: router.query.postId,
      },
    ]);
  };

  useEffect(() => {
    if (data) {
      setCommentsList(data);
    }
  }, [data]);

  return (
    <div>
      <h3>Комментарии</h3>
      <StyledForm action="POST" onSubmit={submitHandler}>
        <label htmlFor="name">Введите ваше имя:</label>
        <input type="text" id="name" ref={nameRef} />
        <label htmlFor="text">Введите ваше сообщение:</label>
        <textarea id="text" rows={5} ref={textRef} />
        <button type="submit">Отправить</button>
      </StyledForm>
      <ul>
        {commentsList.map((comment: IComment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
