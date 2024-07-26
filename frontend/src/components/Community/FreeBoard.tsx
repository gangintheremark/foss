import { tmpPosts } from '@/constants/tmpPosts';

import Button from './Button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeBoard = () => {
  const [posts, setPosts] = useState(tmpPosts);
  const nav = useNavigate();

  return (
    <div>
      <div>자유 게시판</div>

      <table>
        <thead>
          <tr>
            <th>게시글 번호</th>
            <th>게시글 제목</th>
            <th>글쓴이</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              onClick={() => {
                nav(`/community/${post.id}`);
              }}
            >
              <td>{post.id}번</td>
              <td>{post.title}</td>
              <td>{post.writer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button text={'글 쓰기'} onClick={() => nav('/community/create')} />
    </div>
  );
};

export default FreeBoard;
