import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CardStack = ({ photos, onSwipeComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const constraintsRef = useRef(null);

  // Handle drag end - determine if card should be swiped away
  const handleDragEnd = (event, info) => {
    const threshold = 50; // Lower threshold for more sensitivity
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // More sensitive swipe detection - lower thresholds
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 200) {
      const direction = offset > 0 ? 1 : -1; // 1 for right, -1 for left
      setExitX(direction * 1000); // Move card off screen
      setIsAnimating(true);
      
      // Immediate state update - no setTimeout delay
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      setExitX(0);
      setIsAnimating(false);
      
      if (onSwipeComplete) {
        onSwipeComplete(direction);
      }
    }
  };

  // Get visible cards (top 3-4 cards in stack)
  const getVisibleCards = () => {
    const visibleCount = Math.min(4, photos.length);
    const cards = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % photos.length;
      const isTop = i === 0;
      const stackOffset = i;
      
      cards.push({
        index,
        photo: photos[index],
        isTop,
        stackOffset,
        zIndex: 1000 - stackOffset,
        scale: 1 - (stackOffset * 0.05), // Slight scale down for depth
        rotation: isTop ? 0 : (Math.random() - 0.5) * 10, // Random rotation for stack effect
        offsetX: isTop ? 0 : (Math.random() - 0.5) * 20, // Random horizontal offset
        offsetY: isTop ? 0 : (Math.random() - 0.5) * 15, // Random vertical offset
        opacity: isTop ? 1 : 0.9 - (stackOffset * 0.1)
      });
    }
    
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div 
      ref={constraintsRef}
      className="card-stack-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        touchAction: 'pan-x'
      }}
    >
      <AnimatePresence>
        {visibleCards.map((card) => (
          <motion.div
            key={`${card.index}-${currentIndex}`} // Force re-render when currentIndex changes
            className="card"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '280px',
              height: '350px',
              zIndex: card.zIndex,
              cursor: card.isTop ? 'grab' : 'default'
            }}
            initial={{
              x: card.offsetX - 140, // -140px to center the 280px wide card
              y: card.offsetY - 175, // -175px to center the 350px tall card
              scale: card.scale,
              rotate: card.rotation,
              opacity: card.opacity
            }}
            animate={{
              x: card.isTop ? -140 : card.offsetX - 140, // Center the top card
              y: card.isTop ? -175 : card.offsetY - 175, // Center the top card
              scale: card.scale,
              rotate: card.isTop ? 0 : card.rotation,
              opacity: card.opacity
            }}
            exit={{
              x: exitX,
              rotate: exitX > 0 ? 30 : -30,
              opacity: 0,
              scale: 0.8
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeOut"
            }}
            drag={card.isTop && !isAnimating}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={true}
            onDragEnd={card.isTop ? handleDragEnd : undefined}
            whileDrag={{
              scale: 1.05,
              rotate: 0,
              zIndex: 1001
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                backgroundColor: '#1a1a1a'
              }}
            >
              <img
                src={card.photo}
                alt={`Brand asset ${card.index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                draggable={false}
                onError={(e) => {
                  console.error('Failed to load image:', card.photo);
                  e.target.style.opacity = '0.5';
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Swipe indicators */}
      <div className="swipe-indicators" style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 1002
      }}>
        <div style={{
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '20px',
          color: 'white',
          fontSize: '12px',
          fontFamily: 'Courier New, monospace'
        }}>
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
