import { useState } from 'react';
import Button from './Button';
import HashTag from './HashTag';
import HashTagEdit from './HashTagEdit';

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
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSetting;
