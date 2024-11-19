import React, { useRef, useState } from 'react';
import './../Styles/Banner.css';
import ban1 from '/banner_2.jpg'
import ban2 from '/banner_4.jpg'
import ban3 from '/banner_5.jpg'
import arrow from '/back_1.svg'


const slides = [
  {
    id: 1,
    img: ban1,
  },
  {
    id: 2,
    img: ban2,
  },
  {
    id: 3,
    img: ban3,
  },
];

const Banner = () => {
  const slider = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideForward = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0; // Если последний слайд, начинаем с первого
    }
    setCurrentIndex(nextIndex);
    slider.current.style.transform = `translateX(-${nextIndex * 100}%)`; // Сдвигаем слайдер
  };

  const slideBackward = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1; // Если первый слайд, переходим к последнему
    }
    setCurrentIndex(prevIndex);
    slider.current.style.transform = `translateX(-${prevIndex * 100}%)`;
  };

  return (
    <div className='banner'>
      <div className='banner-container'>
        <img src={arrow} alt="Prev" className='back-btn' onClick={slideBackward} />
        <div className="slider">
          <ul ref={slider} className="slider-list">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                <img src={slide.img} alt={`Banner ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
        <img src={arrow} alt="Next" className='next-btn' onClick={slideForward} />
      </div>
    </div>
  );
};

export default Banner;
