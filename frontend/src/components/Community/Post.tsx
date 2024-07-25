import { tmpPosts } from '@/constants/tmpPosts';
import { useNavigate, useParams } from 'react-router-dom';
import Button from './Button';

const Post = () => {
  const { id } = useParams();
  const post = tmpPosts.find((tmpPost) => String(tmpPost.id) === String(id));
  const nav = useNavigate();

  const onUpdatePost = () => {
    console.log('수정');
  };

  const onDeletePost = () => {
    console.log('삭제');
    nav('/community');
  };

  return (
    <div>
      <div>{post.id}번</div>
      <div>{post.title}</div>
      <div>{post.writer}</div>
      <div>{post.content}</div>

      <Button text="수정" onClick={onUpdatePost} />
      <Button text="삭제" onClick={onDeletePost} />
    </div>
  );
};

export default Post;
