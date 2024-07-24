const Profile = ({ username, nickname, role, profileUrl }) => {
  return (
    <div className="flex flex-col items-center">
      <div>프로필</div>
      <div>
        <img src={profileUrl} alt="Profile" className="w-48 h-48 object-cover rounded-full" />
      </div>
      <div>
        {nickname} ({role})
      </div>
      <div>{username}</div>
    </div>
  );
};

export default Profile;
