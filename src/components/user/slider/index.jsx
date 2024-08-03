// SliderComponent.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const SliderItem = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <Slider {...settings}>
            <div className='slider-image'>
                <img src="https://www.dataselect.com/wp-content/uploads/2023/08/Smartphone-Specifications-Explained-2.webp" alt="Slide 1" />
            </div>
            <div className='slider-image'>
                <img src="https://foxvalleyfire.com/wp-content/uploads/2019/06/hikvision-box-bullet-fisheye-pan-tilt-zoom-dome-cameras-sm.jpg" alt="Slide 2" />
            </div>
        </Slider>
    );
};

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

export default SliderItem;
