import React, { useState, useEffect, useRef, useMemo } from 'react';
import './WineNight.css';

// Wine Night Photos Array - All 89 Photos in Sequential Order
const wineNightPhotos = [
  '/photos/wine-night/egirls june 2025-001.jpg',
  '/photos/wine-night/egirls june 2025-002.jpg',
  '/photos/wine-night/egirls june 2025-003.jpg',
  '/photos/wine-night/egirls june 2025-004.jpg',
  '/photos/wine-night/egirls june 2025-005.jpg',
  '/photos/wine-night/egirls june 2025-006.jpg',
  '/photos/wine-night/egirls june 2025-007.jpg',
  '/photos/wine-night/egirls june 2025-008.jpg',
  '/photos/wine-night/egirls june 2025-009.jpg',
  '/photos/wine-night/egirls june 2025-010.jpg',
  '/photos/wine-night/egirls june 2025-011.jpg',
  '/photos/wine-night/egirls june 2025-012.jpg',
  '/photos/wine-night/egirls june 2025-013.jpg',
  '/photos/wine-night/egirls june 2025-014.jpg',
  '/photos/wine-night/egirls june 2025-015.jpg',
  '/photos/wine-night/egirls june 2025-016.jpg',
  '/photos/wine-night/egirls june 2025-017.jpg',
  '/photos/wine-night/egirls june 2025-019.jpg',
  '/photos/wine-night/egirls june 2025-021.jpg',
  '/photos/wine-night/egirls june 2025-022.jpg',
  '/photos/wine-night/egirls june 2025-023.jpg',
  '/photos/wine-night/egirls june 2025-024.jpg',
  '/photos/wine-night/egirls june 2025-025.jpg',
  '/photos/wine-night/egirls june 2025-026.jpg',
  '/photos/wine-night/egirls june 2025-027.jpg',
  '/photos/wine-night/egirls june 2025-028.jpg',
  '/photos/wine-night/egirls june 2025-029.jpg',
  '/photos/wine-night/egirls june 2025-030.jpg',
  '/photos/wine-night/egirls june 2025-031.jpg',
  '/photos/wine-night/egirls june 2025-032.jpg',
  '/photos/wine-night/egirls june 2025-033.jpg',
  '/photos/wine-night/egirls june 2025-034.jpg',
  '/photos/wine-night/egirls june 2025-035.jpg',
  '/photos/wine-night/egirls june 2025-036.jpg',
  '/photos/wine-night/egirls june 2025-037.jpg',
  '/photos/wine-night/egirls june 2025-039.jpg',
  '/photos/wine-night/egirls june 2025-040.jpg',
  '/photos/wine-night/egirls june 2025-041.jpg',
  '/photos/wine-night/egirls june 2025-042.jpg',
  '/photos/wine-night/egirls june 2025-043.jpg',
  '/photos/wine-night/egirls june 2025-044.jpg',
  '/photos/wine-night/egirls june 2025-045.jpg',
  '/photos/wine-night/egirls june 2025-046.jpg',
  '/photos/wine-night/egirls june 2025-047.jpg',
  '/photos/wine-night/egirls june 2025-048.jpg',
  '/photos/wine-night/egirls june 2025-049.jpg',
  '/photos/wine-night/egirls june 2025-050.jpg',
  '/photos/wine-night/egirls june 2025-051.jpg',
  '/photos/wine-night/egirls june 2025-052.jpg',
  '/photos/wine-night/egirls june 2025-053.jpg',
  '/photos/wine-night/egirls june 2025-054.jpg',
  '/photos/wine-night/egirls june 2025-055.jpg',
  '/photos/wine-night/egirls june 2025-056.jpg',
  '/photos/wine-night/egirls june 2025-057.jpg',
  '/photos/wine-night/egirls june 2025-058.jpg',
  '/photos/wine-night/egirls june 2025-059.jpg',
  '/photos/wine-night/egirls june 2025-060.jpg',
  '/photos/wine-night/egirls june 2025-061.jpg',
  '/photos/wine-night/egirls june 2025-062.jpg',
  '/photos/wine-night/egirls june 2025-065.jpg',
  '/photos/wine-night/egirls june 2025-066.jpg',
  '/photos/wine-night/egirls june 2025-067.jpg',
  '/photos/wine-night/egirls june 2025-068.jpg',
  '/photos/wine-night/egirls june 2025-069.jpg',
  '/photos/wine-night/egirls june 2025-071.jpg',
  '/photos/wine-night/egirls june 2025-072.jpg',
  '/photos/wine-night/egirls june 2025-073.jpg',
  '/photos/wine-night/egirls june 2025-074.jpg',
  '/photos/wine-night/egirls june 2025-075.jpg',
  '/photos/wine-night/egirls june 2025-076.jpg',
  '/photos/wine-night/egirls june 2025-080.jpg',
  '/photos/wine-night/egirls june 2025-081.jpg',
  '/photos/wine-night/egirls june 2025-082.jpg',
  '/photos/wine-night/egirls june 2025-083.jpg',
  '/photos/wine-night/egirls june 2025-085.jpg',
  '/photos/wine-night/egirls june 2025-086.jpg',
  '/photos/wine-night/egirls june 2025-087.jpg',
  '/photos/wine-night/egirls june 2025-088.jpg',
  '/photos/wine-night/egirls june 2025-089.jpg',
  '/photos/wine-night/egirls june 2025-091.jpg',
  '/photos/wine-night/egirls june 2025-092.jpg',
  '/photos/wine-night/egirls june 2025-093.jpg',
  '/photos/wine-night/egirls june 2025-094.jpg',
  '/photos/wine-night/egirls june 2025-095.jpg',
  '/photos/wine-night/egirls june 2025-096.jpg',
  '/photos/wine-night/egirls june 2025-097.jpg',
  '/photos/wine-night/egirls june 2025-098.jpg',
  '/photos/wine-night/egirls june 2025-100.jpg',
  '/photos/wine-night/egirls june 2025-101.jpg'
];

// Simple Photo Timeline Component
const PhotoTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  // Simple wheel scroll
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    const sensitivity = 0.5;
    const newTranslateX = translateX + (delta * sensitivity);
    setTranslateX(newTranslateX);
    
    const newIndex = Math.round(-newTranslateX / 250);
    const wrappedIndex = ((newIndex % wineNightPhotos.length) + wineNightPhotos.length) % wineNightPhotos.length;
    setCurrentIndex(wrappedIndex);
  };
  
  // Simple mouse drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - translateX);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newTranslateX = e.clientX - startX;
    setTranslateX(newTranslateX);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    const photoWidth = 250;
    const snappedIndex = Math.round(-translateX / photoWidth);
    const wrappedIndex = ((snappedIndex % wineNightPhotos.length) + wineNightPhotos.length) % wineNightPhotos.length;
    setCurrentIndex(wrappedIndex);
    setTranslateX(-wrappedIndex * photoWidth);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.touches[0].clientX - translateX);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    e.preventDefault(); // Prevent default scrolling
    const newTranslateX = e.touches[0].clientX - startX;
    setTranslateX(newTranslateX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const photoWidth = 250;
    const snappedIndex = Math.round(-translateX / photoWidth);
    const wrappedIndex = ((snappedIndex % wineNightPhotos.length) + wineNightPhotos.length) % wineNightPhotos.length;
    setCurrentIndex(wrappedIndex);
    setTranslateX(-wrappedIndex * photoWidth);
  };

  // Calculate photo positions
  const getPhotoStyle = (index) => {
    const photoSpacing = 250;
    const baseX = index * photoSpacing;
    const currentX = baseX + translateX;
    const centerX = 0;
    const distanceFromCenter = Math.abs(currentX - centerX);
    
    let scale = 0.4;
    if (distanceFromCenter <= 400) {
      const scaleRatio = 1 - (distanceFromCenter / 400);
      scale = 0.4 + (0.8 * scaleRatio);
    }
    
    const verticalOffset = (index % 2 === 0) ? 30 : -20;
    
    return {
      transform: `translateX(${currentX}px) translateY(${verticalOffset}px) scale(${scale})`,
      zIndex: Math.floor(scale * 100),
      opacity: 0.4 + (0.6 * (scale - 0.4) / 0.8)
    };
  };

  return (
    <div 
      className="photo-timeline-container" 
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="photo-timeline">
        {Array.from({ length: 10 }, (_, arrayIndex) => 
          wineNightPhotos.map((photo, photoIndex) => {
            const globalIndex = (arrayIndex - 5) * wineNightPhotos.length + photoIndex;
            return (
              <div
                key={`${arrayIndex}-${photoIndex}`}
                className="photo-item"
                style={{
                  ...getPhotoStyle(globalIndex),
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-150px',
                  marginTop: '-200px',
                  transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <img
                  src={photo}
                  alt={`Wine night photo ${photoIndex + 1}`}
                  loading="lazy"
                  style={{
                    width: '300px',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in'
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                  }}
                  onError={(e) => {
                    console.error('Failed to load wine night photo:', photo);
                    e.target.style.opacity = '0.5';
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const WineNight = ({ onClose }) => {
  return (
    <div className="wine-night-page">
      <div className="wine-night-header">
        <div className="terminal-buttons">
          <div className="terminal-button close" onClick={onClose}>
            <span className="close-icon">×</span>
          </div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">wine night</div>
      </div>
      <div className="wine-night-content">
        <PhotoTimeline />
        <div className="wine-night-thanks">
          <p>thank you to our friends at aptos for helping us host the egirls wine night</p>
        </div>
      </div>
      <div className="wine-night-footer">
        <div className="wine-night-logo">
          <img src="/egirl_logo.svg" alt="egirls logo" />
        </div>
      </div>
    </div>
  );
};

export default WineNight;
