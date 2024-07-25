import { tmpPosts } from '@/constants/tmpPosts';

import Button from './Button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const nav = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onCreatePost = () => {
    tmpPosts.push({
      id: 100,
      title: title,
      content: content,
      writer: '육민우',
    });
    nav('/community');
  };

  return (
    <div>
      <div>제목</div>
      <input className="border" onChange={onChangeTitle} />
      <div>내용</div>
      <input className="border" onChange={onChangeContent} />

      <Button text="생성" onClick={onCreatePost} />
    </div>
  );
};

export default CreatePost;
