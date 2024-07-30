import React from 'react';

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
  return (
    <div className="w-full h-16 bg-[#282828] flex items-center justify-center p-4">
      <button onClick={handleAudioChange} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">
        Toggle Audio
      </button>
      <button onClick={handleVideoChange} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">
        Toggle Video
      </button>
      <button onClick={leaveSession} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">
        Toggle leaveSession
      </button>
    </div>
  );
};

export default Toolbar;
