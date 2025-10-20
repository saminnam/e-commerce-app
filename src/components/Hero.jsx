import React, { useEffect, useRef, useState } from "react";
import { heroSlides } from "../data/heroSlides";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const slidesRef = useRef(null);
  const indicatorsRef = useRef([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const isDragging = useRef(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToSlide = (index) => {
    clearTimeout(intervalRef.current);
    const slides = slidesRef.current;
    const indicators = indicatorsRef.current;

    indicators.forEach((ind, i) => {
      const progress = ind.querySelector(".progress");
      ind.classList.toggle("active", i === index);
      progress.style.transition = "none";
      progress.style.width = "0%";
      void progress.offsetWidth; // trigger reflow
      if (i === index) {
        progress.style.transition = "width 3s linear";
        setTimeout(() => (progress.style.width = "100%"), 50);
      }
    });

    slides.style.transition = "transform 0.5s ease-in-out";
    slides.style.transform = `translateX(-${index * 100}%)`;
    setCurrent(index);

    intervalRef.current = setTimeout(() => {
      goToSlide((index + 1) % heroSlides.length);
    }, 3000);
  };

  // --- Event Handlers for Swipe ---
  const handleStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX;
    slidesRef.current.style.transition = "none";
  };

  const handleMove = (clientX) => {
    if (!isDragging.current) return;
    deltaX.current = clientX - startX.current;
    slidesRef.current.style.transform = `translateX(${
      -current * 100 + (deltaX.current / slidesRef.current.clientWidth) * 100
    }%)`;
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (deltaX.current > 50) {
      goToSlide((current - 1 + heroSlides.length) % heroSlides.length);
    } else if (deltaX.current < -50) {
      goToSlide((current + 1) % heroSlides.length);
    } else {
      goToSlide(current);
    }
    deltaX.current = 0;
  };

  useEffect(() => {
    goToSlide(0);

    const handleMouseMove = (e) => handleMove(e.pageX);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
    const handleMouseUp = handleEnd;
    const handleTouchEnd = handleEnd;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      clearTimeout(intervalRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="slider-container overflow-hidden">
      <div
        id="slides"
        ref={slidesRef}
        className="slides"
        onMouseDown={(e) => handleStart(e.pageX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      >
        {heroSlides.map((slide) => (
          <div className="slide" key={slide.id}>
            <img
              src={isMobile ? slide.mobileImg : slide.desktopImg}
              alt={slide.title}
              className="object-contain h-full md:h-[500px]"
            />
          </div>
        ))}
      </div>

      <div className="indicators">
        {heroSlides.map((_, i) => (
          <div
            key={i}
            ref={(el) => (indicatorsRef.current[i] = el)}
            className={`indicator ${i === current ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          >
            <div className="progress"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
