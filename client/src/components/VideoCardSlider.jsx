import React, { useRef, useEffect, useState } from 'react';
import './VideoCardSlider.css';

const MOBILE_BREAKPOINT = 768;

const storiesData = [
  { id: 1, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769170577/rental-car/videos/IMG_1631.mov', username: 'desert_king', caption: 'Desert adventure!' },
  { id: 2, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769173190/rental-car/videos/IMG_28415.mov', username: 'dune_rider', caption: 'Fun ride!' },
  { id: 3, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769170577/rental-car/videos/IMG_21841.mov', username: 'bike_nomad', caption: 'Bike ride!' },
  { id: 4, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769170577/rental-car/videos/IMG_36304.mov', username: 'sand_master', caption: 'Dune bashing!' },
  { id: 5, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769173190/rental-car/videos/IMG_36962.mov', username: 'safari_guy', caption: 'Desert safari!' },
  { id: 6, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769173190/rental-car/videos/IMG_37343.mov', username: 'offroad_x', caption: 'Another ride!' },
];

export const VideoCardSlider = () => {
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  );

  const slidesToShow = isMobile ? 1 : 5;

  useEffect(() => {
    const onResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const totalSlides = Math.max(1, storiesData.length - slidesToShow + 1);
  const cardWidth = 100 / slidesToShow;
  const offset = -currentIndex * cardWidth;

  // 🔥 PLAY ONLY CURRENT VIDEO
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === currentIndex) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex]);

  // Desktop autoplay
  useEffect(() => {
    if (isMobile) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1 >= totalSlides ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile, totalSlides]);

  const goTo = (i) =>
    setCurrentIndex(Math.max(0, Math.min(i, totalSlides - 1)));

  return (
    <div className="video-card-slider-container">
      <div className="video-slider-viewport">
        <button
          className="video-slider-btn prev"
          onClick={() => goTo(currentIndex - 1)}
        >
          ‹
        </button>

        <div className="video-slider-track-wrap">
          <div
            className="video-slider-track"
            style={{
              width: `${(storiesData.length * 100) / slidesToShow}%`,
              transform: `translateX(${offset}%)`,
            }}
          >
            {storiesData.map((story, index) => (
              <div
                key={story.id}
                className="video-slider-card-wrap"
                style={{ width: `${cardWidth}%` }}
              >
                <div className="video-card">
                  <div className="video-wrapper">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={`${story.videoUrl}?v=${story.id}`}
                      muted
                      playsInline
                      loop={!isMobile}
                      preload={index === currentIndex ? 'auto' : 'metadata'}
                      poster="https://res.cloudinary.com/dkjjrna9o/video/upload/so_0/f_jpg/v1769170577/rental-car/videos/IMG_1631.jpg"
                      className="video-element"
                    />
                  </div>

                  <div className="card-overlay">
                    <span className="username">@{story.username}</span>
                    <p className="caption">{story.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="video-slider-btn next"
          onClick={() => goTo(currentIndex + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
};
