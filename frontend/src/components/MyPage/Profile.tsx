import { WiThermometer } from 'react-icons/wi';

const Profile = ({ username, nickname, role, profileUrl, rating }) => {
  return (
    <div className="flex flex-col items-center relative">
      <div className="relative">
        <img src={profileUrl} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
      </div>
      <div className="text-lg font-semibold mt-2">
        {nickname}
      </div>
      <div className="flex mt-2 items-center">
        <WiThermometer className="text-red-500" size="1.5em" />
        <span className="ml-1">나의 온도 {rating} 36 °C</span>
      </div>
    </div>
  );
};

export default Profile;
