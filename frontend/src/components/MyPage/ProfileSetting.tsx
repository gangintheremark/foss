import { useState, useEffect } from 'react';
import Button from './Button';
import HashTag from './HashTag';
import HashTagEdit from './HashTagEdit';
import useNotificationStore from '@/store/notificationParticipant';
import SessionCreatePage from '../OpenVidu/Screen/SessionCreatePage';
import axios from 'axios';

const APPLICATION_SERVER_URL = 'http://localhost:8080';
const ProfileSetting = ({
  title,
  username,
  nickname,
  age,
  gender,
  role,
  profileUrl,
  myHashtags,
  onUpdateUserData,
}) => {
  const [editMode, setEditMode] = useState(false);

  const onClickEditProfile = () => {
    setEditMode(!editMode);
  };

  const onClickSaveProfile = () => {
    setEditMode(!editMode);
    // 서버에 변경 사항 갱신 요청
  };

  const onDeleteHashTag = (text) => {
    const updatedHashtags = myHashtags.filter((myHashtag) => String(myHashtag) !== String(text));
    onUpdateUserData({ myHashtags: updatedHashtags });
  };

  const [memberId, setMemberId] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { notifications, checkNotification } = useNotificationStore();
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 로그인된 사용자의 memberId를 가져옵니다.
        const memberResponse = await axios.get(`${APPLICATION_SERVER_URL}/members`);
        const memberIdFromResponse = memberResponse.data.id; // number 타입으로 가져옵니다.
        setMemberId(memberIdFromResponse);

        // 해당 memberId를 사용하여 세션 ID를 조회합니다.
        const sessionResponse = await axios.get(
          `${APPLICATION_SERVER_URL}/meeting-notifications/sessions/member/${memberIdFromResponse}`
        );
        const sessionIdFromResponse = sessionResponse.data.sessionId;
        setSessionId(sessionIdFromResponse);

        // 세션 ID를 기반으로 알림 상태를 확인합니다.
        if (sessionIdFromResponse && memberIdFromResponse) {
          await checkNotification(sessionIdFromResponse, memberIdFromResponse.toString());
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemberData();
  }, [checkNotification]);

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
            <td className="w-32 p-4 font-semibold text-gray-700">Age</td>
            <td className="w-32 p-4 text-gray-800">{age}</td>
            <td className="w-32 p-4"></td>
          </tr>
          <tr className="border-b">
            <td className="w-32 p-4 font-semibold text-gray-700">Gender</td>
            <td className="w-32 p-4 text-gray-800">{gender}</td>
            <td className="w-32 p-4"></td>
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
          <button
            className={`btn ${
              notifications[`${sessionId}_${memberId}`] ? 'btn-active' : 'btn-inactive'
            }`}
          ></button>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSetting;
