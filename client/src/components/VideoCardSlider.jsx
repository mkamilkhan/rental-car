import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/VideoCardSlider.css';
// import desertVideo1 from '../assets/IMG_21481.MOV';
// import desertVideo2 from '../assets/IMG_28415.MOV';
// import desertVideo3 from '../assets/IMG_36304.MOV';
// import desertVideo4 from '../assets/IMG_36962.MOV';
// import desertVideo5 from '../assets/IMG_37343.MOV';

const storiesData = [
  { id: 1, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769170577/rental-car/videos/IMG_1631.mov', username: 'john_doe', caption: 'Desert adventure!' },
  { id: 2, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769173190/rental-car/videos/IMG_28415.mov', username: 'jane_doe', caption: 'Fun ride!' },
  { id: 3, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769170577/rental-car/videos/IMG_1631.mov', username: 'alex_smith', caption: 'Bike ride!' },
  { id: 4, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769170577/rental-car/videos/IMG_1631.mov', username: 'alex_smith', caption: 'More desert fun!' },
  { id: 5, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769173190/rental-car/videos/IMG_28415.mov', username: 'alex_smith', caption: 'Another ride!' },
];


export const VideoCardSlider = () => {
  const sliderRef = useRef(null);
  const videoRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,        // <-- 5 cards per row
    slidesToScroll: 1,
    arrows: false,          // no arrows
    autoplay: true,
    autoplaySpeed: 5000,    // 5 seconds
    beforeChange: (current, next) => {
      const currentVideo = videoRefs.current[current];
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }
      setCurrentSlide(next);
    },
    afterChange: (current) => {
      const video = videoRefs.current[current];
      if (video) video.play().catch(() => {});
    },
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 4 } }, // smaller desktop
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) firstVideo.play().catch(() => {});
  }, []);

  const handleVideoEnded = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  return (
    <div className="video-card-slider-container">
      <Slider ref={sliderRef} {...settings}>
        {storiesData.map((story, index) => (
          <div key={story.id} className="slider-item">
            <div className="video-card">
              <div className="video-wrapper">
                <video
                  ref={(el) => { if (el) videoRefs.current[index] = el; }}
                  className="video-element"
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onEnded={() => handleVideoEnded(index)}
                >
                  <source src={story.videoUrl} type="video/quicktime" />
                  <source src={story.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="card-overlay">
                <div className="user-info">
                  <span className="username">@{story.username}</span>
                </div>
                <p className="caption">{story.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
