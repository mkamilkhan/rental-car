// import React, { useRef, useEffect, useState } from 'react';
// import './VideoCardSlider.css';

// const MOBILE_BREAKPOINT = 768;

// const storiesData = [
//   { id: 1, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769170577/rental-car/videos/IMG_1631.mov', username: 'desert_king', caption: 'Desert adventure!' },
//   { id: 2, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769173190/rental-car/videos/IMG_28415.mov', username: 'dune_rider', caption: 'Fun ride!' },
//   { id: 3, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769170577/rental-car/videos/IMG_21841.mov', username: 'bike_nomad', caption: 'Bike ride!' },
//   { id: 4, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769170577/rental-car/videos/IMG_36304.mov', username: 'sand_master', caption: 'Dune bashing!' },
//   { id: 5, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769173190/rental-car/videos/IMG_36962.mov', username: 'safari_guy', caption: 'Desert safari!' },
//   { id: 6, videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4,vc_h264,br_2000k/v1769173190/rental-car/videos/IMG_37343.mov', username: 'offroad_x', caption: 'Another ride!' },
// ];

// export const VideoCardSlider = () => {
//   const videoRefs = useRef([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(
//     typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
//   );

//   const slidesToShow = isMobile ? 1 : 5;

//   useEffect(() => {
//     const onResize = () =>
//       setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

//   const totalSlides = Math.max(1, storiesData.length - slidesToShow + 1);
//   const cardWidth = 100 / slidesToShow;
//   const offset = -currentIndex * cardWidth;

//   // 🔥 PLAY ONLY CURRENT VIDEO
//   useEffect(() => {
//     videoRefs.current.forEach((video, i) => {
//       if (!video) return;

//       if (i === currentIndex) {
//         video.muted = true;
//         video.play().catch(() => {});
//       } else {
//         video.pause();
//         video.currentTime = 0;
//       }
//     });
//   }, [currentIndex]);

//   // Desktop autoplay
//   useEffect(() => {
//     if (isMobile) return;
//     const timer = setInterval(() => {
//       setCurrentIndex((i) => (i + 1 >= totalSlides ? 0 : i + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [isMobile, totalSlides]);

//   const goTo = (i) =>
//     setCurrentIndex(Math.max(0, Math.min(i, totalSlides - 1)));

//   return (
//     <div className="video-card-slider-container">
//       <div className="video-slider-viewport">
//         <button
//           className="video-slider-btn prev"
//           onClick={() => goTo(currentIndex - 1)}
//         >
//           ‹
//         </button>

//         <div className="video-slider-track-wrap">
//           <div
//             className="video-slider-track"
//             style={{
//               width: `${(storiesData.length * 100) / slidesToShow}%`,
//               transform: `translateX(${offset}%)`,
//             }}
//           >
//             {storiesData.map((story, index) => (
//               <div
//                 key={story.id}
//                 className="video-slider-card-wrap"
//                 style={{ width: `${cardWidth}%` }}
//               >
//                 <div className="video-card">
//                   <div className="video-wrapper">
//                     <video
//                       ref={(el) => (videoRefs.current[index] = el)}
//                       src={`${story.videoUrl}?v=${story.id}`}
//                       muted
//                       playsInline
//                       loop={!isMobile}
//                       preload={index === currentIndex ? 'auto' : 'metadata'}
//                       poster="https://res.cloudinary.com/dkjjrna9o/video/upload/so_0/f_jpg/v1769170577/rental-car/videos/IMG_1631.jpg"
//                       className="video-element"
//                     />
//                   </div>

//                   <div className="card-overlay">
//                     <span className="username">@{story.username}</span>
//                     <p className="caption">{story.caption}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           className="video-slider-btn next"
//           onClick={() => goTo(currentIndex + 1)}
//         >
//           ›
//         </button>
//       </div>
//     </div>
//   );
// };
import React, { useRef, useEffect, useState } from 'react';
import './VideoCardSlider.css';

const MOBILE_BREAKPOINT = 768;

const storiesData = [
  { 
    id: 1, 
    videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769170577/rental-car/videos/IMG_1631.mov', 
    username: 'desert_king', 
    caption: 'Desert adventure!' 
  },
  { 
    id: 2, 
    videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769173190/rental-car/videos/IMG_28415.mov', 
    username: 'dune_rider', 
    caption: 'Fun ride!' 
  },
  { 
    id: 3, 
    videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769170577/rental-car/videos/IMG_1631.mov', 
    username: 'bike_nomad', 
    caption: 'Bike ride!' 
  },
  { 
    id: 4, 
    videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769170577/rental-car/videos/IMG_1631.mov', 
    username: 'sand_master', 
    caption: 'Dune bashing!' 
  },
  { 
    id: 5, 
    videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769173190/rental-car/videos/IMG_1631.mov', 
    username: 'safari_guy', 
    caption: 'Desert safari!' 
  },
  { 
    id: 6, 
    videoUrl: 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769173190/rental-car/videos/IMG_1631.mov', 
    username: 'offroad_x', 
    caption: 'Another ride!' 
  },
];

export const VideoCardSlider = () => {
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  );
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [videoErrors, setVideoErrors] = useState(new Set());

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

  // Handle video loaded
  const handleVideoLoaded = (index) => {
    setLoadedVideos(prev => new Set(prev).add(index));
  };

  // Handle video error
  const handleVideoError = (index) => {
    console.error(`Video ${index} failed to load:`, storiesData[index].videoUrl);
    setVideoErrors(prev => new Set(prev).add(index));
  };

  // Play videos in view
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      // Calculate if video is in view based on slidesToShow
      const isInView = i >= currentIndex && i < currentIndex + slidesToShow;

      if (isInView && loadedVideos.has(i) && !videoErrors.has(i)) {
        video.muted = true;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Video started playing
            })
            .catch((error) => {
              console.log(`Video ${i} autoplay prevented:`, error);
              // Autoplay was prevented, user needs to interact
            });
        }
      } else {
        video.pause();
      }
    });
  }, [currentIndex, slidesToShow, loadedVideos, videoErrors]);

  // Desktop autoplay slider
  useEffect(() => {
    if (isMobile) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1 >= totalSlides ? 0 : i + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isMobile, totalSlides]);

  const goTo = (i) =>
    setCurrentIndex(Math.max(0, Math.min(i, totalSlides - 1)));

  const handlePrev = () => {
    if (currentIndex > 0) {
      goTo(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      goTo(currentIndex + 1);
    }
  };

  return (
    <div className="video-card-slider-container">
      <div className="video-slider-header">
        <h3 className="video-slider-subtitle">Experience</h3>
        <h2 className="video-slider-title">Adventure Stories</h2>
        <p className="video-slider-description">
          Real moments from our amazing journeys
        </p>
      </div>

      <div className="video-slider-viewport">
        {currentIndex > 0 && (
          <button
            className="video-slider-btn prev"
            onClick={handlePrev}
            aria-label="Previous"
          >
            ‹
          </button>
        )}

        <div className="video-slider-track-wrap">
          <div
            className="video-slider-track"
            style={{
              width: `${(storiesData.length * 100) / slidesToShow}%`,
              transform: `translateX(${offset}%)`,
            }}
          >
            {storiesData.map((story, index) => {
              const isInView = index >= currentIndex && index < currentIndex + slidesToShow;
              
              return (
                <div
                  key={story.id}
                  className={`video-slider-card-wrap ${isInView ? 'in-view' : ''}`}
                  style={{ width: `${cardWidth}%` }}
                >
                  <div className="video-card">
                    <div className="video-wrapper">
                      {videoErrors.has(index) ? (
                        <div className="video-error">
                          <span>⚠️</span>
                          <p>Video unavailable</p>
                        </div>
                      ) : (
                        <>
                          <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            src={story.videoUrl}
                            muted
                            playsInline
                            loop
                            preload={isInView ? 'auto' : 'metadata'}
                            className="video-element"
                            onLoadedData={() => handleVideoLoaded(index)}
                            onError={() => handleVideoError(index)}
                          />
                          {!loadedVideos.has(index) && (
                            <div className="video-loading">
                              <div className="loading-spinner"></div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="card-overlay">
                      <div className="card-gradient"></div>
                      <div className="card-content">
                        <span className="username">@{story.username}</span>
                        <p className="caption">{story.caption}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {currentIndex < totalSlides - 1 && (
          <button
            className="video-slider-btn next"
            onClick={handleNext}
            aria-label="Next"
          >
            ›
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="video-slider-dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className={`video-slider-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};