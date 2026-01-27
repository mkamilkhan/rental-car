import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./CategoriesSlider.css";

const CategoriesSlider = ({ categories = [] }) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className="no-categories">No categories available</div>;
  }

  return (
    <div className="categories-slider-wrapper">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={28}
        slidesPerView={4}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 28,
          },
        }}
        className="categories-swiper"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx} className="category-slide">
            <div className="category-card-tour">
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.name} className="category-image" />
              </div>
              <div className="category-content">
                <h3 className="category-title">{cat.name}</h3>
                <Link to={`/category/${cat.id}`} className="category-see-more">
                  See More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
