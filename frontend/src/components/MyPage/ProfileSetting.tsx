import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import HashTag from './HashTag';
import HashTagEdit from './HashTagEdit';
import { useQueryClient } from '@tanstack/react-query';
import useNotificationStore from '@/store/notificationParticipant';
import apiClient from './../../utils/util';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import ClipLoader from 'react-spinners/ClipLoader';

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
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [canCreateRoom, setCanCreateRoom] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
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
        if (members) {
          setProfileData(members);
          console.log(profileData);
          setMemberEmail(members.email ?? '');
          console.log(memberEmail);
          setNewEmail(members.email ?? '');
          setNewName(members.name ?? '');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyData();
  }, [memberEmail]);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!memberEmail) return;
      try {
        const memberResponse = await apiClient.get('/members/search', {
          params: { email: memberEmail },
        });

        const memberData = memberResponse.data;
        const memberIdFromResponse = memberData.id;
        setMemberId(memberIdFromResponse);
        console.log(memberIdFromResponse);
        if (memberIdFromResponse) {
          const sessionResponse = await apiClient.get(
            `/meeting-notifications/sessions/member/${memberIdFromResponse}`
          );
          console.log(sessionResponse);
          const sessionIdFromResponse = sessionResponse.data;
          console.log(sessionIdFromResponse);
          setSessionId(sessionIdFromResponse);

          if (sessionIdFromResponse && memberIdFromResponse) {
            const notificationStatus = await checkNotification(
              sessionIdFromResponse,
              memberIdFromResponse
            );
            setCanCreateRoom(notificationStatus);
          }
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemberData();
  }, [memberEmail, canCreateRoom]);

  useEffect(() => {
    if (profileImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(profileImageFile);
    } else {
      setProfileImagePreview(null);
    }
  }, [profileImageFile]);

  const onClickEditProfile = () => {
    setEditMode(!editMode);
  };

  const onCancelEditProfile = () => {
    if (profileData) {
      setNewEmail(profileData.email || '');
      setNewName(profileData.name || '');
      setProfileImageFile(null);
      setProfileImagePreview(null);
    }
    setEditMode(false);
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

  if (loading || !profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#4CCDC6"} />
      </div>
    );
  }

  return (
    <div>
      <table className="w-full border-collapse mt-5 mx-20">
        <tbody>
          <tr>
            <td className="w-32 p-4 font-semibold text-gray-700">이미지</td>
            <td className="w-32 p-4 flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="relative">
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
                      className="w-20 h-20 object-cover rounded-full cursor-pointer"
                      alt="Profile"
                      onClick={handleFileInputClick}
                    />
                  ) : profileData.profileImg ? (
                    <img
                      src={profileData.profileImg}
                      className="w-20 h-20 object-cover rounded-full cursor-pointer"
                      alt="Profile"
                      onClick={handleFileInputClick}
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                      onClick={handleFileInputClick}
                    >
                      No Image
                    </div>
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
                      <MdEdit
                        className="absolute bottom-0 right-0 text-white bg-black rounded-full p-1 cursor-pointer"
                        size="1.5em"
                        onClick={handleFileInputClick}
                      />
                    </>
                  )}
                </div>
              </div>
            </td>
            <td className="w-32 p-4"></td>
          </tr>
          <tr>
            <td className="w-32 p-4 font-semibold text-gray-700">이름</td>
            <td className="w-32 p-4 text-gray-800">{profileData.name}
            </td>
          </tr>
          <tr>
            <td className="w-32 p-4 font-semibold text-gray-700">이메일</td>
            <td className="w-32 p-4 text-gray-800">
              {editMode ? (
                <input
                  type="email"
                  value={newEmail}
                  onChange={handleEmailChange}
                  className="w-full px-3 rounded border border-gray focus:border-[#4CCDC6] focus:outline-none focus:ring-2 focus:ring-[#4CCDC6]"
                />
              ) : (
                profileData.email || '이메일을 입력해주세요.'
              )}
            </td>
            <td className="w-32">
              {editMode ? (<MdEdit
                className="text-white bg-black rounded-full p-1"
                size="1.5em"
              />
              ) : (
                <div></div>
              )}
            </td>

          </tr>
          <tr>
            <td className="w-32 p-4 font-semibold text-gray-700">멘토/멘티</td>
            <td className="w-32 p-4 text-gray-800">
              <span>현재 </span>
              <span className="mx-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {role}
              </span>
              <span>로 설정되어 있습니다.</span>
            </td>
          </tr>
          <tr>
            <td className="w-32 p-4">
              {canCreateRoom && (
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  text="방 참여하기"
                  onClick={() => handleCreateSession(sessionId)}
                />
              )}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <div className="flex justify-end">
                <div className="flex items-center space-x-2">
                  {editMode ? (
                    <>
                      <div
                        className="bg-[#4CCDC6] text-white hover:bg-[#3AB8B2] rounded-2xl px-4 py-2 cursor-pointer"
                        onClick={onClickSaveProfile}
                      >
                        저장
                      </div>
                      <div
                        className="bg-gray-500 text-black hover:bg-gray-600 rounded-2xl px-4 py-2 cursor-pointer"
                        onClick={onCancelEditProfile}
                      >
                        취소
                      </div>
                    </>
                  ) : (
                    <div
                      className="bg-[#4CCDC6] text-white hover:bg-[#3AB8B2] rounded-2xl px-4 py-2 cursor-pointer"
                      onClick={onClickEditProfile}
                    >
                      변경
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSetting;
