import { useState, useEffect } from 'react';
import Button from './Button';
import HashTag from './HashTag';
import HashTagEdit from './HashTagEdit';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useNotificationStore from '@/store/notificationParticipant';
import SessionCreatePage from '../OpenVidu/Screen/SessionCreatePage';
import apiClient from './../../utils/util';

interface UserProfile {
  email: string;
  name: string;
  profileImage: string;
}

const APPLICATION_SERVER_URL = 'http://localhost:8080';
const ProfileSetting = ({
  title,
  username,
  nickname,

  role,
  profileUrl,
  myHashtags,
  onUpdateUserData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();
  const onClickEditProfile = () => {
    setEditMode(!editMode);
  };

  const onClickSaveProfile = () => {
    setEditMode(!editMode);
  };

  const onDeleteHashTag = (text) => {
    const updatedHashtags = myHashtags.filter((myHashtag) => String(myHashtag) !== String(text));
    onUpdateUserData({ myHashtags: updatedHashtags });
  };

  const [memberId, setMemberId] = useState<number | null>(null);
  const [memberArray, setMemberArray] = useState<UserProfile[] | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { notifications, checkNotification } = useNotificationStore();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const memberResponse = await apiClient.get('/members');
        const members: UserProfile[] = memberResponse.data;
        setMemberArray(members);
        console.log(memberArray);
        setMemberId(memberIdFromResponse);

        const sessionResponse = await apiClient.get(
          `/meeting-notifications/sessions/member/${memberIdFromResponse}`
        );
        const sessionIdFromResponse = sessionResponse.data.sessionId;
        setSessionId(sessionIdFromResponse);

        if (sessionIdFromResponse && memberIdFromResponse) {
          await checkNotification(sessionIdFromResponse, memberIdFromResponse);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemberData();
  }, [checkNotification]);

  const notificationKey = `${sessionId}_${memberId}`;
  const canJoin = notifications[notificationKey] || false;

  return (
    <div>
      <div className="flex justify-between">
        <h1>{title}</h1>
        <div className="mb-4 border">
          {editMode ? (
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              text="회원 정보 저장"
              onClick={onClickSaveProfile}
            />
          ) : (
            <Button
              className="bg-green-500 text-white hover:bg-green-600"
              text="회원 정보 수정"
              onClick={onClickEditProfile}
            />
          )}
        </div>
      </div>
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="w-32 p-4 font-semibold text-gray-700">프사</td>
            <td className="w-32 p-4">
              <img src={profileUrl} className="w-48 h-auto rounded-lg" alt="Profile" />
            </td>
            <td className="w-32 p-4"></td>
          </tr>
          <tr className="border-b">
            <td className="w-32 p-4 font-semibold text-gray-700">E-mail</td>
            <td className="w-32 p-4 text-gray-800">{username}</td>
            <td className="w-32 p-4"></td>
          </tr>
          <tr className="border-b">
            <td className="w-32 p-4 font-semibold text-gray-700">NickName</td>
            <td className="w-32 p-4 text-gray-800">{nickname}</td>
            <td className="w-32 p-4">
              {editMode ? (
                <Button
                  className="bg-yellow-500 text-white hover:bg-yellow-600"
                  text="닉네임 변경"
                />
              ) : null}
            </td>
          </tr>

          <tr className="border-b">
            <td className="w-32 p-4 font-semibold text-gray-700">Role</td>
            <td className="w-32 p-4 text-gray-800">{role}</td>
            <td className="w-32 p-4"></td>
          </tr>
          <tr>
            <td className="w-32 p-4 font-semibold text-gray-700">HashTag</td>
            <td className="w-32 p-4 flex flex-wrap gap-2">
              {editMode
                ? myHashtags.map((myHashtag) => (
                    <HashTagEdit
                      key={myHashtag}
                      text={myHashtag}
                      onClick={() => onDeleteHashTag(myHashtag)}
                      className="bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-600"
                    />
                  ))
                : myHashtags.map((myHashtag) => (
                    <HashTag
                      key={myHashtag}
                      text={myHashtag}
                      className="bg-gray-200 text-gray-800 rounded-lg px-3 py-1"
                    />
                  ))}
            </td>
            <td className="w-32 p-4"></td>
          </tr>
          <SessionCreatePage />
          {canJoin && <button onClick={() => alert('방 입장하기 클릭')}>방 입장하기</button>}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSetting;
