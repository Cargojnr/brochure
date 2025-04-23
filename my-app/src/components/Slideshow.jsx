// components/Slideshow.js
import React, { useState, useEffect } from 'react';
import '../slideshow.css'; // We'll create this next

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  return (
    <div className="slideshow-container" >
      {/* Left column slides */}
      {!isMobile && (
        <div className="slideshow-column left-column" >
        {images.map((image, index) => (
          <div
            key={`left-${index}`}
            className={`slide ${index === currentIndex ? 'active' : ''} ${index % 2 === 0 ? 'left-slide' : ''}`}
            style={{
              // backgroundImage: `url(${image.url})`,
              transform: `scale(${index === currentIndex ? 1.1 : 1})`,
              zIndex: index === currentIndex ? 2 : 1
            }}
            onClick={() => goToSlide(index)}
          >

            <img src={image.url} className='slide-image'/>
            <div className="slide-content">
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      ) }
      

      {/* Right column slides */}
      <div className="slideshow-column right-column">
        {images.map((image, index) => (
          <div
            key={`right-${index}`}
            className={`slide ${index === currentIndex ? 'active' : ''} ${index % 2 !== 0 ? 'right-slide' : ''}`}
            style={{
              // backgroundImage: `url(${image.url})`,
              // backgroundPosition: `center`,
              transform: `scale(${index === currentIndex ? 1.1 : 1})`,
              zIndex: index === currentIndex ? 2 : 1
            }}
            onClick={() => goToSlide(index)}
          >

            <img src={image.url} className='slide-image'/>
            <div className="slide-content" style={{ zIndex: 3 }}>
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="slideshow-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;