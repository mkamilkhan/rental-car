import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CategoriesSlider.css";

const CategoriesSlider = ({ categories = [] }) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className="no-categories">No categories available</div>;
  }

  const sliderSettings = {
    slidesToShow: 4, // desktop
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="categories-slider-wrapper">
      <Slider {...sliderSettings} className="categories-slick-slider">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-slide">
            <div className="category-card-tour">
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.title} className="category-image" />
              </div>
              <div className="category-content">
                <h3 className="category-title">{cat.title}</h3>
                <Link to={`/category/${cat.id}`} className="category-see-more">
                  See More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoriesSlider;
