import React, { useState } from 'react';
import micOn from '@assets/icon/micOn.png';
import micOff from '@assets/icon/micOff.png';
import camOn from '@assets/icon/camOn.png'; 
import camOff from '@assets/icon/camOff.png'; 
import exit from '@assets/icon/exit.png'; // 세션 종료 아이콘 경로

interface ToolbarProps {
  handleAudioChange: () => void;
  handleVideoChange: () => void;
  leaveSession: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  handleAudioChange,
  handleVideoChange,
  leaveSession,
}) => {
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    handleAudioChange();
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    handleVideoChange();
  };

  return (
    <div className="w-full h-16 bg-[#282828] flex items-center justify-center p-4">
      <img 
        src={isAudioOn ? micOn : micOff} 
        alt="Toggle Audio" 
        onClick={toggleAudio} 
        className="mx-2 w-8 h-8 cursor-pointer" 
      />
      <img 
        src={isVideoOn ? camOn : camOff} 
        alt="Toggle Video" 
        onClick={toggleVideo} 
        className="mx-10 w-10 h-10 cursor-pointer" 
      />
      <img
        src={exit}
        alt="Leave Session"
        onClick={leaveSession}
        className="mx-2 w-8 h-8 cursor-pointer"
      />
    </div>
  );
};

export default Toolbar;
