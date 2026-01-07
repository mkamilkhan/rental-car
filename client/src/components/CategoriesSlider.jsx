import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const CategoriesSlider = ({ categories }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      spaceBetween={16}
      breakpoints={{
        0: { slidesPerView: 2 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
    >
      {categories.map((cat, i) => (
        <SwiperSlide key={i}>
          <div className="category-card">

            {/* 🔶 RHOMBUS STICKER */}
            <span className="category-sticker">
              <p style={{fontSize:'8px', color:'#056C89'}}>Adventure</p>
          
            </span>

            <img src={cat.image} alt={cat.name} />

            <div className="category-overlay">
              <h3>{cat.name}</h3>
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesSlider;
