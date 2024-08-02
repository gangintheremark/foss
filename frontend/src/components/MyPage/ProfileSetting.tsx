import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { MdEdit } from 'react-icons/md';
import ClipLoader from 'react-spinners/ClipLoader';
import apiClient from './../../utils/util';
import CompanySearch from '../CompanyPage/CompanySearch';
import { useNavigate, Link } from 'react-router-dom';
import useNotificationStore from '@/store/notificationParticipant';
import useParticipantsStore from '@/store/paticipant';
import Folder from '../../assets/svg/mypage/document.svg?react';
import { tmpCompanies } from '@/constants/tmpCompanies';

interface UserProfile {
  email: string | null;
  name: string;
  profileImg: string | null;
  role: string | null;
}

interface MentorInfo {
  selfProduce: string;
  fileUrl: string;
  careers: Array<{
    companyName: string;
    department: string;
    startedDate: string;
    endedDate: string;
  }>;
}

interface MentorProfile extends UserProfile {
  mentorInfo: MentorInfo;
}

const isMentorProfile = (profile: UserProfile): profile is MentorProfile => {
  return profile.role === 'MENTOR';
};

export const getCompanyId = (companyName: string) => {
  const company = tmpCompanies.find((c) => c.name === companyName);
  return company ? company.id : null;
};

const ProfileSetting = ({
  title,
  username,
  nickname,
  role,
  profileImg,
  onUpdateUserData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editMentoMode, setEditMentoMode] = useState(false);
  const { addParticipant } = useParticipantsStore();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [newEmail, setNewEmail] = useState<string>('');
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [canCreateRoom, setCanCreateRoom] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [introduction, setIntroduction] = useState<string>('');
  const FILE_SIZE_MAX_LIMIT = 50 * 1024 * 1024;
  const [loading, setLoading] = useState(true);
  const { notifications, checkNotification } = useNotificationStore();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mentoCertification, setMentoCertification] = useState(false);
  const [experience, setExperience] = useState([]);
  const [newExperience, setNewExperience] = useState({
    companyName: '',
    companyId: '',
    startDate: '',
    endDate: '',
    department: '',
  });
  const [fileText, setFileText] = useState<File | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (files === undefined) {
      return;
    }
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      alert('업로드 가능한 최대 용량은 50MB입니다. ');
      return;
    }
    setFileText(files);
  };

  const handleRemoveFile = () => {
    setFileText(null);
  };

  const [resumeFilePreview, setResumeFilePreview] = useState(null);

  const handleDeleteExperience = (index: number) => {
    setExperience(experience.filter((_, expIndex) => expIndex !== index));
  };

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
      const token = await getToken(sessionId);

      addParticipant({
        id: memberId,
        token,
        userName: newName,
        isHost: false,
        isMicroOn: false,
        isCameraOn: false,
      });

      navigate('/video-chat');
      return token;
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const memberResponse = await apiClient.get('/mypage');
        const members: UserProfile = memberResponse.data;
        if (members) {
          setProfileData(members);
          setMemberEmail(members.email ?? '');
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
  }, []);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!memberEmail) return;
      try {
        const memberResponse = await apiClient.get('/members/search', {
          params: { email: memberEmail },
        });

        const memberData = memberResponse.data;
        const memberIdFromResponse = memberData.id;
        console.log(memberIdFromResponse);
        setMemberId(memberIdFromResponse);

        if (memberIdFromResponse) {
          const sessionResponse = await apiClient.get(
            `/meeting-notifications/sessions/member/${memberIdFromResponse}`
          );
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
  }, [memberEmail]);

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

  const onClickEditMento = () => {
    setEditMentoMode(!editMentoMode);
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

  const handleCheckEmailDuplicate = async () => {
    try {
      const response = await apiClient.get('/members/checkEmail', {
        params: { email: newEmail },
      });
      if (response.data.isDuplicate) {
        alert('이미 사용 중인 이메일입니다.');
      } else {
        alert('사용 가능한 이메일입니다.');
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.error('이메일 중복 체크 중 오류 발생:', error);
    }
  };

  const onClickMentoRegisterButton = async () => {
    try {
      const updateMemberRequest = {
        selfProduce: introduction,
        addCareerRequests: experience.map((exp) => ({
          companyId: exp.companyId,
          department: exp.department,
          startedDate: exp.startDate + 'T00:00:00',
          endedDate: exp.endDate + 'T00:00:00',
        })),
      };
      console.log(updateMemberRequest);
      const formData = new FormData();
      formData.append(
        'createMentorInfoAndCareerRequest',
        new Blob([JSON.stringify(updateMemberRequest)], { type: 'application/json' })
      );

      if (fileText) {
        formData.append('file', fileText);
      }

      const response = await apiClient.post('/mypage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('멘토 정보 수정 완료:', response.data);
        window.location.href = 'http://localhost:5173/my-page';
      } else {
        console.warn('서버 응답 상태:', response.status);
      }
    } catch (error: any) {
      console.error(
        '멘토 정보 수정 중 오류 발생:',
        error.response ? error.response.data : error.message
      );
    }
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
    setIsEmailVerified(false); // 이메일이 변경될 때마다 인증되지 않은 상태로 변경
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCompanySelect = (companyName) => {
    const companyId = getCompanyId(companyName);
    setSelectedCompany(companyName);
    setNewExperience((prev) => ({
      ...prev,
      companyName: companyName,
      companyId: companyId,
    }));
  };

  const handleAddExperience = () => {
    const { companyName, companyId, startDate, endDate, department } = newExperience;
    const newExp = {
      companyName,
      companyId,
      startDate,
      endDate,
      department,
    };
    setExperience([...experience, newExp]);
    setNewExperience({
      companyName: '',
      companyId: '',
      startDate: '',
      endDate: '',
      department: '',
    });
  };

  const isFormValid = () => {
    const { startDate, endDate } = newExperience;

    // 필드가 모두 채워졌는지 확인
    const areFieldsFilled = Object.values(newExperience).every((val) => {
      // val이 문자열일 때만 trim을 적용
      return typeof val === 'string' ? val.trim() !== '' : true;
    });

    // 날짜 유효성 검사
    const isDateValid = new Date(startDate) <= new Date(endDate);

    return areFieldsFilled && isDateValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewExperience({
      ...newExperience,
      [name]: value,
    });

    if (name === 'startDate' || name === 'endDate') {
      const { startDate, endDate } = { ...newExperience, [name]: value };
      if (new Date(startDate) > new Date(endDate)) {
        alert('입사 날짜는 퇴사 날짜보다 이전이어야 합니다.');
      }
    }
  };

  const handleCertificationToggle = () => {
    setMentoCertification(!mentoCertification);
  };

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  if (loading || !profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={'#4CCDC6'} />
      </div>
    );
  }

  return (
    <div>
      <table className="w-full border-collapse mt-5">
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
            <td className="w-32 p-4 text-gray-800">{profileData.name}</td>
          </tr>
          <tr>
            <td className="w-32 p-4 font-semibold text-gray-700">이메일</td>
            <td className="w-32 p-4 text-gray-800">
              {editMode && !isEmailVerified ? (
                <>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-1 rounded border border-gray focus:border-[#4CCDC6] focus:outline-none focus:ring-2 focus:ring-[#4CCDC6]"
                  />
                </>
              ) : (
                profileData.email || '이메일을 입력해주세요.'
              )}
            </td>
            <td className="w-32">
              {editMode && !isEmailVerified && (
                <button
                  onClick={handleCheckEmailDuplicate}
                  className="bg-[#4CCDC6] text-white rounded py-1 px-3"
                >
                  중복체크
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td className="w-32 p-4 font-semibold text-gray-700">멘토/멘티</td>
            <td className="w-32 p-4 text-gray-800">
              <span>현재 </span>
              <span className="mx-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{profileData.role}</span>
              <span>로 설정되어 있습니다.</span>
            </td>
            {profileData.role === 'MENTEE' && !editMode && (
              <td className="w-32 p-4">
                <button
                  className="hover:text-[#3AB8B2] rounded-2xl px-4 py-2 cursor-pointer"
                  onClick={() => setMentoCertification(!mentoCertification)}
                >
                  {mentoCertification ? '닫기' : '👉 멘토 인증 하러가기'}
                </button>
              </td>
            )}
          </tr>
          {mentoCertification && profileData.role === 'MENTEE' && (
            <tr>
              <td colSpan="2">
                <table className="w-full border-collapse mt-5">
                  <tbody>
                    <tr>
                      <td className="w-32 p-4 font-semibold text-gray-700">회사 이름</td>
                      <td className="w-32 p-4">
                        <CompanySearch onCompanySelect={handleCompanySelect} />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32 p-4 font-semibold text-gray-700">입사 날짜</td>
                      <td className="w-32 p-4">
                        <input
                          type="date"
                          name="startDate"
                          value={newExperience.startDate}
                          onChange={handleInputChange}
                          className="w-full px-3 rounded border border-gray focus:border-[#4CCDC6] focus:outline-none focus:ring-2 focus:ring-[#4CCDC6]"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32 p-4 font-semibold text-gray-700">퇴사 날짜</td>
                      <td className="w-32 p-4">
                        <input
                          type="date"
                          name="endDate"
                          value={newExperience.endDate}
                          onChange={handleInputChange}
                          className="w-full px-3 rounded border border-gray focus:border-[#4CCDC6] focus:outline-none focus:ring-2 focus:ring-[#4CCDC6]"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32 p-4 font-semibold text-gray-700">직무</td>
                      <td className="w-32 p-4">
                        <input
                          type="text"
                          name="department"
                          value={newExperience.department}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded border border-gray focus:border-[#4CCDC6] focus:outline-none focus:ring-2 focus:ring-[#4CCDC6]"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="p-4">
                        <button
                          onClick={handleAddExperience}
                          className={`bg-[#4CCDC6] text-white rounded px-4 py-2 ${
                            isFormValid() ? '' : 'opacity-50 cursor-not-allowed'
                          }`}
                          disabled={!isFormValid()}
                        >
                          경력 추가
                        </button>
                      </td>
                    </tr>

                    {experience.length > 0 && (
                      <tr>
                        <td colSpan="2">
                          <table className="w-full border-collapse mt-5 mb-5">
                            <thead>
                              <tr>
                                <th className="w-32 p-4 font-semibold text-gray-700">회사 이름</th>
                                <th className="w-32 p-4 font-semibold text-gray-700">입사 날짜</th>
                                <th className="w-32 p-4 font-semibold text-gray-700">퇴사 날짜</th>
                                <th className="w-32 p-4 font-semibold text-gray-700">직무</th>
                              </tr>
                            </thead>
                            <tbody>
                              {experience.map((exp, index) => (
                                <tr key={index}>
                                  <td
                                    className="w-32 p-4 text-gray-800"
                                    style={{ paddingLeft: '30px' }}
                                  >
                                    {exp.companyName}
                                  </td>
                                  <td className="w-32 p-4 text-gray-800">{exp.startDate}</td>
                                  <td className="w-32 p-4 text-gray-800">{exp.endDate}</td>
                                  <td className="w-32 p-4 text-gray-800">{exp.department}</td>

                                  <button
                                    onClick={() => handleDeleteExperience(index)}
                                    className="bg-[#c8480d] text-white rounded px-4 py-2"
                                  >
                                    삭제
                                  </button>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td className="w-32 pt-10 p-4 font-semibold text-gray-700">경력증명서</td>
                      <td style={{ paddingLeft: '20px' }}>
                        <div className="relative">
                          <label htmlFor="file-upload">
                            <div className="border-[1px] border-[#D5D7D9] border-solid rounded h-10 min-w-[435px] w-3/4 px-3 py-2 truncate">
                              {!fileText ? (
                                <div className="absolute top-2 left-4 text-[#B1B3B5]">
                                  경력증명서 제출 <span className="text-red-700">*</span>
                                </div>
                              ) : (
                                fileText.name
                              )}
                            </div>
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            name="file"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                          {fileText && (
                            <button
                              type="button"
                              className="ml-4 text-red-600"
                              onClick={handleRemoveFile}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32 p-4 font-semibold text-gray-700">자기소개</td>
                      <td className="w-32 p-4">
                        <textarea
                          name="introduction"
                          value={introduction}
                          onChange={handleIntroductionChange}
                          className="w-full px-3 rounded border border-gray focus:border-[#4CCDC6] focus:outline-none focus:ring-2 focus:ring-[#4CCDC6]"
                          rows="4"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-center">
                        <div className="mt-4">
                          <button
                            onClick={onClickMentoRegisterButton}
                            className="bg-[#3884e0] text-white rounded px-4 py-2"
                          >
                            멘토 인증
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}

          {isMentorProfile(profileData) && (
            <>
              <tr>
                <td></td>
                <td className="px-4">
                  <p className="text-green-600 font-semibold">
                    ✅ 인증이 완료되었습니다.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="w-32 p-4 font-semibold text-gray-700">자기소개</td>
                <td colSpan="2" className="w-32 p-4 text-gray-800">
                  {profileData.mentorInfo?.selfProduce}
                </td>
              </tr>
              <tr>
                <td className="w-32 p-4 font-semibold text-gray-700">경력사항</td>
                <td>
                  {profileData.mentorInfo?.careers.map((exp, index) => (
                    <tr key={index}>
                      <td className="w-32 p-4 text-gray-800">{exp.companyName}</td>
                      <td className="w-20 p-4 text-gray-800">{exp.startedDate}</td>
                      <td className="text-gray-800">~</td>
                      <td className="w-20 p-4 text-gray-800">{exp.endedDate}</td>
                      <td className="w-32 p-4 text-gray-800">{exp.department}</td>
                    </tr>
                  ))}
                </td>
              </tr>
            </>
          )}

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
                        disabled={!isEmailVerified}
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
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSetting;