import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import HashTag from './HashTag';
import HashTagEdit from './HashTagEdit';
import { useQueryClient } from '@tanstack/react-query';
import useNotificationStore from '@/store/notificationParticipant';
import apiClient from './../../utils/util';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  email: string | null;
  name: string;
  profileImg: string | null;
}

const ProfileSetting = ({
  title,
  username,
  nickname,
  role,
  profileImg,
  myHashtags,
  onUpdateUserData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [canCreateRoom, setCanCreateRoom] = useState(false); // 방 만들기 버튼 상태
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { notifications, checkNotification } = useNotificationStore();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);

  const getToken = async (sessionId: string) => {
    try {
      const tokenResponse = await apiClient.post(`/meeting/sessions/${sessionId}/connections`);
      return tokenResponse.data;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  };

  const handleCreateSession = async (sessionId: string) => {
    try {
      await apiClient.post(`/meeting/sessions`, { customSessionId: sessionId });

      const token = await getToken(sessionId);
      navigate('/video-chat', {
        state: { newSessionId: sessionId, token, userName: newName },
      });
      return token;
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const memberResponse = await apiClient.get('/members');
        const members: UserProfile = memberResponse.data;
        console.log(members);
        console.log('Members Email:', members.email);
        if (members) {
          setProfileData(members);
          setNewEmail(members.email ?? '');
          console.log(newEmail);
          setNewName(members.name ?? '');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    const fetchMemberData = async () => {
      try {
        console.log(newEmail);
        const memberResponse = await apiClient.get('/members/search', {
          params: { email: newEmail },
        });

        const memberData = memberResponse.data;
        const memberIdFromResponse = memberData.id;
        console.log(memberIdFromResponse);

        if (memberIdFromResponse) {
          const sessionResponse = await apiClient.get(
            `/meeting-notifications/sessions/member/${memberIdFromResponse}`
          );
          const sessionIdFromResponse = sessionResponse.data.sessionId;
          setSessionId(sessionIdFromResponse);

          if (sessionIdFromResponse && memberIdFromResponse) {
            const notificationStatus = await checkNotification(
              sessionIdFromResponse,
              memberIdFromResponse
            );
            setCanCreateRoom(notificationStatus); // 방 만들기 버튼 상태 업데이트
          }
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMyData();
    fetchMemberData();
  }, [newEmail]);

  const onClickEditProfile = () => {
    setEditMode(!editMode);
  };

  const onClickSaveProfile = async () => {
    setEditMode(!editMode);
    try {
      const updateMemberRequest = {
        name: newName,
        email: newEmail,
      };

      const formData = new FormData();

      formData.append(
        'updateMemberRequest',
        new Blob([JSON.stringify(updateMemberRequest)], { type: 'application/json' })
      );

      if (profileImageFile) {
        formData.append('profileImg', profileImageFile);
      } else {
        formData.append(
          'profileImg',
          new Blob([], { type: 'application/octet-stream' }),
          'empty-profile-img.png'
        );
      }

      const response = await apiClient.put('/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('회원 정보 수정 완료:', response.data);
      onUpdateUserData(response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error('회원 정보 수정 중 오류 발생:', error);
    }
  };

  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImageFile(event.target.files[0]);
    }
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

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
            <td className="w-32 p-4 flex items-center space-x-4">
              <div className="flex flex-col items-center">
                {profileData.profileImg ? (
                  <img
                    src={profileData.profileImg}
                    className="w-48 h-auto rounded-lg"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-48 h-auto rounded-lg bg-gray-200">No Image</div>
                )}
                {editMode && (
                  <>
                    <input
                      type="file"
                      onChange={handleProfileImageChange}
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    />
                    <Button
                      className="bg-gray-500 text-white hover:bg-gray-600"
                      text="변경"
                      onClick={handleFileInputClick}
                    />
                  </>
                )}
              </div>
            </td>
            <td className="w-32 p-4"></td>
          </tr>
          <tr className="border-b">
            <td className="w-32 p-4 font-semibold text-gray-700">E-mail</td>
            <td className="w-32 p-4 text-gray-800">
              {editMode ? (
                <input
                  type="email"
                  value={newEmail}
                  onChange={handleEmailChange}
                  className="w-full p-2 rounded"
                  style={{ border: 'none' }}
                />
              ) : (
                profileData.email || 'No Email'
              )}
            </td>
            <td className="w-32 p-4"></td>
          </tr>
          <tr className="border-b">
            <td className="w-32 p-4 font-semibold text-gray-700">Name</td>
            <td className="w-32 p-4 text-gray-800">
              {editMode ? (
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  className="w-full p-2 rounded"
                  style={{ border: 'none' }}
                />
              ) : (
                profileData.name
              )}
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

          <td className="w-32 p-4">
            {canCreateRoom && (
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                text="방 만들기"
                onClick={() => handleCreateSession(sessionId)}
              />
            )}
          </td>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSetting;
