import { ObjectId } from 'bson';
import { validateComments } from '../helpers/validateComments';
import axios from 'axios';

interface IProps {
  name: string;
  text: string;
  postId: ObjectId;
  replyId?: ObjectId | null;
}

export const sendComment = async ({ name, text, postId, replyId }: IProps) => {
  const validateResponse = validateComments(name, text);

  if (validateResponse === 'Сообщение отправлено') {
    const request: IProps = { name, text, postId };
    if (replyId) {
      request.replyId = replyId;
    }
    const response = await axios.post('/api/comments', request);
    return { response };
  }
  return { validateResponse };
};
