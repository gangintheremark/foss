import React, { useEffect, useRef, useState } from 'react';

interface OpenViduVideoComponentProps {
  streamManager: any;
}

const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [screenMode, setScreenMode] = useState<number>(400);

  useEffect(() => {
    if (props && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props]);

  const handleVideoClick = () => {
    setScreenMode((prevMode) => (prevMode === 400 ? 1440 : 400));
  };

  return (
    <div>
      <video
        autoPlay
        ref={videoRef}
        className={`w-full ${screenMode === 1440 ? 'h-screen' : 'h-auto'} cursor-pointer`}
        onClick={handleVideoClick}
      />
    </div>
  );
};

export default OpenViduVideoComponent;
