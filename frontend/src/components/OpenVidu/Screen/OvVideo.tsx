import React, { useEffect, useRef, useState } from 'react';

interface OpenViduVideoComponentProps {
  streamManager: any;
}

const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [screenMode, setScreenMode] = useState<number>(800);

  useEffect(() => {
    if (props && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props]);

  const handleVideoClick = () => {
    setScreenMode((prevMode) => (prevMode === 600 ? 1440 : 400));
  };

  return (
    <div>
      <video
        autoPlay
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full max-w-full max-h-full object-contain"
        onClick={handleVideoClick}
      />
    </div>
  );
};

export default OpenViduVideoComponent;
