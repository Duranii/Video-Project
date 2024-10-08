import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';

const videos = [
  "https://player.vimeo.com/external/470285833.sd.mp4?s=43f1efbe9d9720e7ea31f0ddb29d6d1d4c39fa1f&profile_id=165",
  "https://player.vimeo.com/external/470285261.sd.mp4?s=2781e8860f25fb75801270f78263a07dc4e3b4ab&profile_id=165",
  "https://player.vimeo.com/external/470285284.sd.mp4?s=8447fd1c178bc58a69bc2914afca7e49453e85df&profile_id=165",
  "https://player.vimeo.com/external/470285664.sd.mp4?s=7707624ca51226c4756349466d2388b6e3d176c5&profile_id=165",
  "https://player.vimeo.com/external/470285867.sd.mp4?s=6437130e7db39d5f6a9077212f79577878b1ac40&profile_id=165",
  "https://player.vimeo.com/external/470285559.sd.mp4?s=587e49eab1d1feb0315a86a18fccc6dc6c16a1be&profile_id=165",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
];

const VideoFeed = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleScroll = () => {
    if (isMobile) return;

    const fraction = 0.1;
    const videoElements = document.querySelectorAll('video');

    videoElements.forEach((video, index) => {
      const rect = video.getBoundingClientRect();
      const visibleX = Math.max(
        0,
        Math.min(rect.width, window.innerWidth - rect.left, rect.right)
      );
      const visibleY = Math.max(
        0,
        Math.min(rect.height, window.innerHeight - rect.top, rect.bottom)
      );
      const visible = (visibleX * visibleY) / (rect.width * rect.height);

      if (visible > fraction) {
        setActiveVideo(index);
      } else if (activeVideo === index) {
        setActiveVideo(null);
      }
    });
  };

  const handleVideoInteraction = (index) => {
    if (isMobile) {
      setActiveVideo(index);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeVideo, isMobile]);

  return (
    <div className="p-4 space-y-10">
      {videos.map((src, index) => (
        <div key={index} className="max-w-4xl mx-auto">
          <VideoCard
            src={src}
            isActive={activeVideo === index}
            onInteraction={() => handleVideoInteraction(index)}
            isMobile={isMobile}
          />
          <h3 className='pt-2 font-bold'>Lorem Ipsum</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et dictum ipsum. Vestibulum molestie finibus vulputate. Morbi hendrerit risus orci, a placerat erat vestibulum vitae.</p>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
