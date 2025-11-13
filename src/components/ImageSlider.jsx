import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  // Image arrays for mobile and laptop views
  const mobileImages = [
    'https://res.cloudinary.com/dunsl7vvf/image/upload/v1762982250/%E0%A4%95%E0%A4%BF%E0%A4%B8%E0%A4%BE%E0%A4%A8_%E0%A4%B8%E0%A4%BE%E0%A4%A5%E0%A5%80_%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A5%80_%E0%A4%AB%E0%A4%BC%E0%A4%B8%E0%A4%B2_%E0%A4%95%E0%A4%BE_%E0%A4%AD%E0%A4%B0%E0%A5%8B%E0%A4%B8%E0%A5%87%E0%A4%AE%E0%A4%82%E0%A4%A6_%E0%A4%B8%E0%A4%BE%E0%A4%A5%E0%A5%80_%E0%A4%B9%E0%A4%B0_%E0%A4%AE%E0%A5%8C%E0%A4%B8%E0%A4%AE_%E0%A4%AE%E0%A5%87%E0%A4%82_%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A5%87_%E0%A4%B8%E0%A4%BE%E0%A4%A5_jr775h.png',
    'https://res.cloudinary.com/dunsl7vvf/image/upload/v1762983442/%E0%A4%95%E0%A4%BF%E0%A4%B8%E0%A4%BE%E0%A4%A8_%E0%A4%B8%E0%A4%BE%E0%A4%A5%E0%A5%80_%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A5%80_%E0%A4%AB%E0%A4%BC%E0%A4%B8%E0%A4%B2_%E0%A4%95%E0%A4%BE_%E0%A4%AD%E0%A4%B0%E0%A5%8B%E0%A4%B8%E0%A5%87%E0%A4%AE%E0%A4%82%E0%A4%A6_%E0%A4%B8%E0%A4%BE%E0%A4%A5%E0%A5%80_%E0%A4%B9%E0%A4%B0_%E0%A4%AE%E0%A5%8C%E0%A4%B8%E0%A4%AE_%E0%A4%AE%E0%A5%87%E0%A4%82_%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A5%87_%E0%A4%B8%E0%A4%BE%E0%A4%A5_2_xmrux5.png'
   
  ];

  const laptopImages = [
   
   
    'https://res.cloudinary.com/dunsl7vvf/image/upload/v1762976775/indian-farmer-showing-smartphone-screen-agriculture-field_75648-6447_knj8mp.avif',
   
    
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Automatically change the image every 1.7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : laptopImages.length));
    }, 1700);

    return () => clearInterval(interval);
  }, [isMobile, mobileImages.length, laptopImages.length]);

  // Detect if the screen size changes to switch between mobile and laptop images
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentImage = isMobile ? mobileImages[currentImageIndex] : laptopImages[currentImageIndex];

  return (
    <div className="relative w-full h-76 lg:h-[58vh] lg:w-full overflow-hidden rounded-sm m-0 p-0">
    
      {/* Image slider */}
      <img
  src={currentImage}
  alt="Slideshow"
  className="w-full h-full object-contain transition-all duration-450 ease-in-out lg:scale-[1.02]"
/>


      {/* Pagination indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
      {(isMobile ? mobileImages.length : laptopImages.length) > 1 && (
  <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
    {(isMobile ? mobileImages : laptopImages).map((_, index) => (
      <span
        key={index}
        className={`w-1 h-1 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
      />
    ))}
  </div>
)}

      </div>
    </div>
  );
};

export default ImageSlider;
