import React, { useEffect, useRef } from 'react';

interface OpenViduVideoComponentProps {
  streamManager: any;
}

const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (props && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props]);

  return (
    <div>
      <video
        autoPlay
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default OpenViduVideoComponent;
