import React, { useState, useEffect, useRef } from 'react';
import { scenesConfig } from './store/tourStore';
import './VirtualTour.css';

const scenesArray = Object.values(scenesConfig);

const VirtualTour = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartY = useRef(0);

  const currentScene = scenesArray[currentIndex];

  const handleSelectScene = (index) => {
    if (index === currentIndex || isTransitioning) return;
    
    // Change index immediately for instant, snappy feedback
    setCurrentIndex(index);
    setIsTransitioning(true);
    
    // Unlock scrolling after the fast crossfade finishes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); 
  };

  // Lock body scroll when overlay is active to prevent background scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning) return;
      
      // Add a small threshold to prevent overly sensitive trackpad scrolls
      if (e.deltaY > 30) {
        handleSelectScene(currentIndex < scenesArray.length - 1 ? currentIndex + 1 : 0);
      } else if (e.deltaY < -30) {
        handleSelectScene(currentIndex > 0 ? currentIndex - 1 : scenesArray.length - 1);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, isTransitioning]);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isTransitioning) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const distance = touchStartY.current - touchEndY;
    
    if (distance > 40) {
      // Swipe up -> Next
      handleSelectScene(currentIndex < scenesArray.length - 1 ? currentIndex + 1 : 0);
    } else if (distance < -40) {
      // Swipe down -> Prev
      handleSelectScene(currentIndex > 0 ? currentIndex - 1 : scenesArray.length - 1);
    }
  };

  return (
    <div 
      className="virtual-tour-overlay"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="close-tour-btn" onClick={onClose}>
        &times; Exit Tour
      </button>

      {/* Main Cinematic Viewer */}
      <div className="tour-viewer">
        {scenesArray.map((scene, index) => {
          const isActive = index === currentIndex;
          return (
            <div 
              key={scene.id}
              className={`tour-slide ${isActive ? 'active' : ''}`}
              style={{ backgroundImage: `url(${scene.image})` }}
            />
          );
        })}
      </div>

      {/* Professional Customer UI */}
      <div className="tour-ui">
        <div className="tour-header">
          <h2>{currentScene.name}</h2>
          <div className="scroll-indicator mobile-indicator">
            <span className="swipe-icon">↕</span>
            <span>Swipe to explore</span>
          </div>
          <div className="scroll-indicator desktop-indicator">
            <span className="mouse-icon"></span>
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Thumbnail Navigation Gallery */}
        <div className="thumbnail-gallery">
          {scenesArray.map((scene, index) => (
            <div 
              key={`thumb-${scene.id}`}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleSelectScene(index)}
              style={{ backgroundImage: `url(${scene.image})` }}
            >
              <div className="thumb-label">{scene.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
