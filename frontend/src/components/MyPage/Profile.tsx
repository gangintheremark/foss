import { FaStar } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

const Profile = ({ username, nickname, role, profileUrl, rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={index < rating ? 'text-yellow-500' : 'text-yellow-500'}
      //      className={index < rating ? 'text-yellow-500' : 'text-gray-100'}
    />
  ));

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative">
        <img src={profileUrl} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
        <MdEdit className="absolute bottom-0 right-0 text-white bg-black rounded-full p-1" size="1.5em" />
      </div>
      <div className="text-lg font-semibold mt-2">
        {nickname}
      </div>
      <div className="flex mt-2 items-center">
        {stars}
        <span className="ml-1">5</span>
      </div>
    </div>
  );
};

export default Profile;
