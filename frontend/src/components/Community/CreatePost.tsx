import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const nav = useNavigate();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const getCurrentDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const onCreatePost = () => {
    const fetchPost = async () => {
      try {
        await apiClient.post(`/community`, {
          title: title,
          content: content,
          writer: '김치',
          regDate: getCurrentDate(),
        });
        nav('/community');
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchPost();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-teal-800 mb-6">새 게시글 작성</h1>

      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
          제목
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={onChangeTitle}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="게시글 제목을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={onChangeContent}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="게시글 내용을 입력하세요"
        />
      </div>

      <div className="flex justify-end">
        <Button text="생성" type={'CREATE'} onClick={onCreatePost} />
      </div>
    </div>
  );
};

export default CreatePost;
