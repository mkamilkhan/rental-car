import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CategoriesSlider.css";

const CategoriesSlider = ({ categories = [] }) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className="no-categories">No categories available</div>;
  }

  const settings = {
    dots: true,
    infinite: categories.length > 5, // 🔥 important
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          infinite: categories.length > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px"
        }
      }
      
    ],
  };

  return (
    <div className="categories-slider-wrapper">
      <Slider {...settings} className="categories-slick-slider">
        {categories.map((cat, index) => (
          <div key={index} className="category-slide">
            <div className="category-card-tour">
              <div className="category-image-wrapper">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-image"
                />
              </div>

              <div className="category-content">
                <h3 className="category-title">{cat.name}</h3>
                <Link to="/destination" className="category-see-more">
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
