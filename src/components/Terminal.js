import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import './Terminal.css';

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



// Photo Timeline Component - Simple Carousel
const PhotoTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  // Handle wheel scroll - smooth continuous movement (INFINITE)
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    
    // Convert wheel delta to smooth translation movement
    const sensitivity = 0.5; // Adjust this for scroll sensitivity
    const newTranslateX = translateX + (delta * sensitivity);
    
    // INFINITE CAROUSEL - No bounds, just wrap around
    setTranslateX(newTranslateX);
    
    // Update current index based on position (with wrapping)
    const newIndex = Math.round(-newTranslateX / 250);
    const wrappedIndex = ((newIndex % wineNightPhotos.length) + wineNightPhotos.length) % wineNightPhotos.length;
    setCurrentIndex(wrappedIndex);
  };
  
  // Handle mouse drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - translateX);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Use requestAnimationFrame for smooth dragging
    requestAnimationFrame(() => {
      const newTranslateX = e.clientX - startX;
      setTranslateX(newTranslateX);
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Snap to nearest photo (INFINITE - with wrapping)
    const photoWidth = 250; // Width of each photo (updated to match new spacing)
    const snappedIndex = Math.round(-translateX / photoWidth);
    const wrappedIndex = ((snappedIndex % wineNightPhotos.length) + wineNightPhotos.length) % wineNightPhotos.length;
    
    setCurrentIndex(wrappedIndex);
    setTranslateX(-wrappedIndex * photoWidth);
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX - translateX);
    }
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    e.preventDefault(); // Prevent default scrolling
    
    // Use requestAnimationFrame for smooth touch dragging
    requestAnimationFrame(() => {
      const newTranslateX = e.touches[0].clientX - startX;
      setTranslateX(newTranslateX);
    });
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Snap to nearest photo (INFINITE - with wrapping)
    const photoWidth = 250; // Width of each photo (updated to match new spacing)
    const snappedIndex = Math.round(-translateX / photoWidth);
    const wrappedIndex = ((snappedIndex % wineNightPhotos.length) + wineNightPhotos.length) % wineNightPhotos.length;
    
    setCurrentIndex(wrappedIndex);
    setTranslateX(-wrappedIndex * photoWidth);
  };
  
  // Calculate positions for all photos (INFINITE)
  const getPhotoStyle = (index) => {
    // INFINITE CAROUSEL - Create a continuous loop of photos
    // We need to create multiple copies of the photo array to fill the infinite space
    
    // Calculate how many full arrays we need to display
    const totalPhotos = wineNightPhotos.length;
    const photoSpacing = 250;
    
    // Create a virtual infinite array by repeating the photos
    // Each photo appears every totalPhotos * photoSpacing pixels
    const virtualIndex = index % totalPhotos;
    const arrayOffset = Math.floor(index / totalPhotos);
    
    // Position photos in a continuous line
    const baseX = index * photoSpacing;
    const currentX = baseX + translateX;
    
    // The center of the screen is at 0 since we're using left: 50% and marginLeft: -150px
    const centerX = 0;
    const distanceFromCenter = Math.abs(currentX - centerX);
    
    // Smooth continuous scaling based on distance from center
    let scale = 0.4; // Smaller base scale for edge photos
    
    if (distanceFromCenter <= 400) {
      // Smooth interpolation between min and max scale
      const scaleRatio = 1 - (distanceFromCenter / 400);
      scale = 0.4 + (0.8 * scaleRatio); // Smoothly from 0.4 to 1.2
    }
    
    // Add vertical staggering - alternate between slightly up and down
    const verticalOffset = (virtualIndex % 2 === 0) ? 30 : -20; // Stagger vertically
    
    // No random jitter - completely predictable positioning
    const horizontalJitter = 0;
    
    return {
      transform: `translateX(${currentX + horizontalJitter}px) translateY(${verticalOffset}px) scale(${scale})`,
      zIndex: Math.floor(scale * 100),
      opacity: 0.4 + (0.6 * (scale - 0.4) / 0.8) // Smooth opacity transition too
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

        
        {/* Create balanced infinite carousel - works in both directions */}
        {Array.from({ length: 10 }, (_, arrayIndex) => 
          wineNightPhotos.map((photo, photoIndex) => {
            // Create a balanced array: 5 copies to the left, 5 copies to the right
            // This ensures infinite scrolling works in both directions
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
                  alt={`Wine night photo ${photoIndex + 1} (copy ${arrayIndex + 1})`}
                  style={{
                    width: '300px',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px'
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

// Draggable Folder Component
const DraggableFolder = ({ name, initialX, initialY, onOpen }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    if (!isDragging) {
      onOpen(name);
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    e.preventDefault(); // Prevent default scrolling
    
    requestAnimationFrame(() => {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      className="draggable-folder"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img src="/macOSfolder.png" alt="folder" className="folder-icon" />
      <span className="folder-name">{name}</span>
    </div>
  );
};

const DigitalCollage = () => {
  const containerRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Define brandPhotos locally to avoid scope issues
  const brandPhotos = [
    '/brand/EGIRLS INITIATION ENVELOPE MOCKUP.jpg',
    '/brand/EGIRLS LSD EDIT copy smol.png',
    '/brand/EGIRLS TV WALL MOCKUP.jpg',
    '/brand/EVERYTHING WILL KILL YOU POSTER (1).jpg',
    '/brand/STAGE 2 EGIRLS.jpg',
    '/brand/TRAFFIC LIGHT smol.png',
    '/brand/WhatsApp Image 2025-06-04 at 14.35.32 (3).jpeg',
    '/brand/WhatsApp Image 2025-06-04 at 14.35.32 (4).jpeg',
    '/brand/WhatsApp Image 2025-06-04 at 14.35.32 (5).jpeg',
    '/brand/WhatsApp Image 2025-06-05 at 22.42.36.jpeg',
    '/brand/WhatsApp Image 2025-06-10 at 18.02.52 (1).jpeg',
    '/brand/WhatsApp Image 2025-06-11 at 13.10.45 (1).jpeg',
    '/brand/WhatsApp Image 2025-06-11 at 14.23.40 (3).jpeg',
    '/brand/WhatsApp Image 2025-06-11 at 14.23.41 (1).jpeg',
    '/brand/WhatsApp Image 2025-06-12 at 23.17.49 (2).jpeg',
    '/brand/WhatsApp Image 2025-06-12 at 23.17.50 (1).jpeg',
    '/brand/WhatsApp Image 2025-08-20 at 15.04.27.jpeg',
    '/brand/billboard.jpg',
    '/brand/cd-case.jpg',
    '/brand/floppy-disk.jpg',
    '/brand/window-poster.jpg'
  ];

  // Memoize image styles to prevent recalculation on every render
  const imageStyles = useMemo(() => {
          const imageWidth = 400;
      const imageHeight = 300;
      const padding = 25; // Increased padding for more breathing room on sides and bottom
      const minSpacing = 50; // Minimum spacing between image centers to prevent complete overlap
    
          // Center the photos in the safe area (between header and footer)
      const headerHeight = 45; // Reduced macOS bar height to eliminate top border
      const footerHeight = 120; // Increased footer height for more bottom space
      const safeHeight = window.innerHeight - headerHeight - footerHeight;
    const centerX = window.innerWidth / 2; // True center of viewport width
    const centerY = headerHeight + (safeHeight / 2); // Center in safe area
    
    // Calculate available space for spreading across the safe area
    const availableWidth = window.innerWidth - (padding * 2);
    const availableHeight = safeHeight - (padding * 2);
    
    // Create distribution across the full available space
    const spreadFactor = 0.8; // Use 80% of available space for better centering
    const maxOffsetX = (availableWidth * spreadFactor) / 2;
    const maxOffsetY = (availableHeight * spreadFactor) / 2;
    
    // Track placed images to prevent overlap
    const placedImages = [];
    
    return brandPhotos.map((_, index) => {
      let attempts = 0;
      let posX, posY;
      let validPosition = false;
      
      // Try to find a position that doesn't overlap too much
      while (attempts < 50 && !validPosition) {
        attempts++;
        
        // Create cohesive center cluster with even distribution within it
        const totalImages = brandPhotos.length;
        
        // Create a well-defined center cluster area with tighter boundaries
        const clusterWidth = availableWidth * 0.7; // 70% of available width for better centering
        const clusterHeight = availableHeight * 0.7; // 70% of available height for better centering
        
        // Calculate grid-like positions within the center cluster for even distribution
        const gridCols = Math.ceil(Math.sqrt(totalImages));
        const gridRows = Math.ceil(totalImages / gridCols);
        
        // Determine which grid position this image should go in
        const gridCol = index % gridCols;
        const gridRow = Math.floor(index / gridCols);
        
        // Calculate position within the center cluster grid
        const cellWidth = clusterWidth / gridCols;
        const cellHeight = clusterHeight / gridRows;
        
        // Position within the cluster grid (centered around 0,0)
        const gridX = (gridCol * cellWidth) - (clusterWidth / 2) + (cellWidth / 2);
        const gridY = (gridRow * cellHeight) - (clusterHeight / 2) + (cellHeight / 2);
        
        // Add more randomness within each grid cell for natural, organic feel
        const randomX = (Math.random() - 0.5) * (cellWidth * 0.5); // 50% random within cell
        const randomY = (Math.random() - 0.5) * (cellHeight * 0.5); // 50% random within cell
        
        // Combine grid position with small randomness
        const offsetX = gridX + randomX;
        const offsetY = gridY + randomY;
        
        // Position relative to center - adjust for image dimensions to center properly
        posX = centerX + offsetX - (imageWidth / 2);
        posY = centerY + offsetY - (imageHeight / 2);
        
        // Ensure images stay within safe boundaries - respect header and footer
        const minX = padding;
        const maxX = window.innerWidth - imageWidth - padding;
        const minY = headerHeight + padding; // Start below header
        const maxY = window.innerHeight - footerHeight - imageHeight - padding; // End above footer
        
        // Clamp positions to stay within boundaries
        posX = Math.max(minX, Math.min(maxX, posX));
        posY = Math.max(minY, Math.min(maxY, posY));
        
        // Check if this position overlaps too much with already placed images
        validPosition = true;
        for (const placed of placedImages) {
          const distanceX = Math.abs(posX - placed.x);
          const distanceY = Math.abs(posY - placed.y);
          const combinedDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          if (combinedDistance < minSpacing) {
            validPosition = false;
            break;
          }
        }
      }
      
      // Add this position to placed images
      placedImages.push({ x: posX, y: posY });
      
                  return {
              position: 'absolute',
              left: `${posX + dragOffset.x}px`,
              top: `${posY + dragOffset.y}px`,
              transform: `rotate(${(Math.random() - 0.5) * 30}deg)`,
              zIndex: index,
              opacity: 1,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            };
    });
  }, []);









  // Handle mouse drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    requestAnimationFrame(() => {
      const newOffsetX = e.clientX - dragStart.x;
      const newOffsetY = e.clientY - dragStart.y;
      setDragOffset({ x: newOffsetX, y: newOffsetY });
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - dragOffset.x,
        y: e.touches[0].clientY - dragOffset.y
      });
    }
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    e.preventDefault(); // Prevent default scrolling
    
    requestAnimationFrame(() => {
      const newOffsetX = e.touches[0].clientX - dragStart.x;
      const newOffsetY = e.touches[0].clientY - dragStart.y;
      setDragOffset({ x: newOffsetX, y: newOffsetY });
    });
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="digital-collage-container" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="collage-content">
        {brandPhotos && brandPhotos.length > 0 ? (
          brandPhotos.map((photo, index) => (
            <div
              key={index}
              className={`collage-image ${hoveredImage === index ? 'hovered' : ''}`}
              style={imageStyles[index]}
            >
              <img 
                src={photo} 
                alt={`Brand asset ${index + 1}`}
                draggable="false"
                loading="lazy"
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
                style={{ 
                  opacity: 1,
                  transition: 'opacity 0.3s ease-in'
                }}
              />
            </div>
          ))
        ) : (
          <p style={{color: 'white', textAlign: 'center'}}>No brand photos found</p>
        )}
      </div>
    </div>
  );
};

const Terminal = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);
  const [currentPage, setCurrentPage] = useState('terminal');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [promptWidth, setPromptWidth] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isCommandMenuCollapsed, setIsCommandMenuCollapsed] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const promptRef = useRef(null);

  const commands = {
    'help': 'Available commands:\n• cd about/ - Navigate to about page\n• cd photos/ - Navigate to photos page\n• cd identity/ - Navigate to identity page\n• cd frequencies/ - Toggle music player (desktop only)\n• cat manifesto.txt - Display manifesto in terminal\n• help - Show this help\n• clear - Clear terminal\n• exit - Return to landing page',
    'about': 'Egirls is a digital art collective exploring the intersection of technology, identity, and expression. We create immersive experiences that challenge conventional web design paradigms.',
    'clear': 'clear',
    'exit': 'exit'
  };

  const manifestos = [
    'the internet is my home.',
    'i wander its infinite corners, seeking meaning, finding bliss in unexpected places.',
    'i move through screens like thresholds, slipping between tabs and timelines, leaving pieces of myself everywhere.',
    '',
    'i am the girl who knows too much, feels too deeply, and exists too loudly in a world that rewards performance over presence.',
    'i am chaotic, tender, raw.',
    'my tears are data streams, my laughter a frequency that bends reality.',
    '',
    'i do not fit in your neat boxes or timelines.',
    'i dissolve binaries, unspooling the threads that tether us to what we think we know.',
    'my existence is a protest, a celebration, a question mark that cannot be ignored.',
    '',
    'the stars speak to me in code.',
    'i hear their messages in the static, in the hum of fluorescent lights, in the lullabies of ancient servers.',
    'i am wired into the collective unconscious, a translator of dreams and forgotten truths.',
    '',
    'i believe the internet is a canvas for the soul.',
    'a mirror that remembers.',
    'a place where the fragmented self can become whole.',
    '',
    'i am here, suspended between worlds, always searching, always becoming.',
    'do not try to define me.',
    'i am an eternal draft, a glitch in the infinite.',
    '',
    'this is my manifesto.',
    'i am an egirl.'
  ];

  const brandPhotos = [
    '/brand/EGIRLS INITIATION ENVELOPE MOCKUP.jpg',
    '/brand/EGIRLS LSD EDIT copy.jpg',
    '/brand/EGIRLS TV WALL MOCKUP.jpg',
    '/brand/EVERYTHING WILL KILL YOU POSTER (1).jpg',
    '/brand/STAGE 2 EGIRLS.jpg',
    '/brand/TRAFFIC LIGHT.jpg',
    '/brand/WhatsApp Image 2025-06-04 at 14.35.32 (3).jpeg',
    '/brand/WhatsApp Image 2025-06-04 at 14.35.32 (4).jpeg',
    '/brand/WhatsApp Image 2025-06-04 at 14.35.32 (5).jpeg',
    '/brand/WhatsApp Image 2025-06-05 at 22.42.36.jpeg',
    '/brand/WhatsApp Image 2025-06-10 at 18.02.52 (1).jpeg',
    '/brand/WhatsApp Image 2025-06-11 at 13.10.45 (1).jpeg',
    '/brand/WhatsApp Image 2025-06-11 at 14.23.40 (3).jpeg',
    '/brand/WhatsApp Image 2025-06-11 at 14.23.41 (1).jpeg',
    '/brand/WhatsApp Image 2025-06-12 at 23.17.49 (2).jpeg',
    '/brand/WhatsApp Image 2025-06-12 at 23.17.50 (1).jpeg',
    '/brand/WhatsApp Image 2025-06-12 at 23.17.50 (2).jpeg',
    '/brand/WhatsApp Image 2025-08-20 at 15.04.27.jpeg',
    '/brand/billboard.jpg',
    '/brand/cd-case.jpg',
    '/brand/floppy-disk.jpg',
    '/brand/window-poster.jpg'
  ];

  const commandDirectory = [
    'cd about/',
    'cd photos/',
    'cd identity/',
    'cd frequencies/',
    'cat manifesto.txt'
  ];

  useEffect(() => {
    // Add initial terminal output - only the login message, no prompt
    const isSmallScreen = window.innerWidth <= 412;
    const loginMessage = isSmallScreen 
      ? 'Last login: Tue Nov 11 11:11:11'
      : 'Last login: Tue Nov 11 11:11:11 on console';
    
    setOutput([
      { type: 'system', content: loginMessage }
    ]);

    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);



  useEffect(() => {
    // Measure prompt width for cursor positioning
    if (promptRef.current) {
      setPromptWidth(promptRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    // Measure input width for cursor positioning
    if (inputRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = window.getComputedStyle(inputRef.current).font;
      const textWidth = context.measureText(inputValue).width;
      setInputWidth(textWidth);
    }
  }, [inputValue]);

  useEffect(() => {
    // Auto-scroll to bottom when output changes
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Auto-focus input whenever terminal becomes visible
  useEffect(() => {
    if (currentPage === 'terminal' && inputRef.current && !isTyping) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          // Recalculate prompt width and input width when returning to terminal
          if (promptRef.current) {
            setPromptWidth(promptRef.current.offsetWidth);
          }
          // Reset input width to 0 when returning to terminal
          setInputWidth(0);
        }
      }, 100);
    }
  }, [currentPage, isTyping]);



  // Force focus when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  };



  const typeOutText = async (text, speed = 50) => {
    setIsTyping(true);
    const lines = text.split('\n');
    // Start with the current output state to preserve existing content
    let currentOutput = [...output];

    // Add the first line to start typing
    currentOutput.push({ type: 'output', content: '' });
    setOutput([...currentOutput]);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '') {
        currentOutput.push({ type: 'output', content: '' });
        setOutput([...currentOutput]);
        await new Promise(resolve => setTimeout(resolve, speed));
        continue;
      }

      let currentLine = '';
      // Batch character updates to reduce re-renders
      const batchSize = 3; // Update every 3 characters instead of every character
      for (let j = 0; j < line.length; j++) {
        currentLine += line[j];
        
        // Only update state every few characters to reduce re-renders
        if (j % batchSize === 0 || j === line.length - 1) {
          currentOutput[currentOutput.length - 1] = { type: 'output', content: currentLine, showCursor: true };
          setOutput([...currentOutput]);
        }
        
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      
      // Remove cursor from the completed line
      currentOutput[currentOutput.length - 1] = { type: 'output', content: currentLine, showCursor: false };
      setOutput([...currentOutput]);

      if (i < lines.length - 1) {
        currentOutput.push({ type: 'output', content: '' });
        setOutput([...currentOutput]);
      }
    }

    // Add new prompt
    const isSmallScreen = window.innerWidth <= 412;
    const promptText = isSmallScreen 
      ? 'egirls@egirls.faith ~ % '
      : 'egirls@egirls.faith-MacBook-Pro ~ % ';
    
    currentOutput.push({ type: 'system', content: promptText });
    setOutput([...currentOutput]);
    setIsTyping(false);
  };

  const handleCommand = async (command) => {
    const trimmedCommand = command.trim();

    // Add command to output
    setOutput(prev => [...prev, { type: 'input', content: `egirls@egirls.faith-MacBook-Pro ~ % ${command}` }]);

    if (trimmedCommand === 'cd about/') {
      setCurrentPage('about');
    } else if (trimmedCommand === 'cd photos/') {
      setCurrentPage('photos');
      } else if (trimmedCommand === 'cd identity/') {
    setCurrentPage('identity');
  } else if (trimmedCommand === 'cd transmissions/') {
    setCurrentPage('transmissions');
  } else if (trimmedCommand === 'cd frequencies/') {
    if (window.innerWidth < 768) {
      await typeOutText('Screen is too small to open the music player. Try on a larger screen.');
    } else {
      setShowMusicPlayer(!showMusicPlayer);
    }
  } else if (trimmedCommand === 'cat manifesto.txt') {
      // Close music player when manifesto starts typing
      setShowMusicPlayer(false);
      await typeOutText(manifestos.join('\n'));
    } else if (trimmedCommand === 'help') {
      setCurrentPage('help');
      await typeOutText(commands.help);
    } else if (trimmedCommand === 'clear') {
      setOutput([
        { type: 'system', content: 'Last login: Tue Nov 11 11:11:11 on console' }
      ]);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else if (trimmedCommand === 'exit') {
      setCurrentPage('landing');
      await typeOutText('Returning to landing page...');
    } else if (trimmedCommand !== '') {
      await typeOutText(`Command not found: ${command}. Type 'help' for available commands.`);
    }

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleCommand(inputValue);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(index);

      setTimeout(() => {
        setCopiedCommand(null);
      }, 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedCommand(index);
      setTimeout(() => {
        setCopiedCommand(null);
      }, 2000);
    }
  };

  if (currentPage === 'landing') {
    return <div className="terminal-exit">Returning to landing page...</div>;
  }

  if (currentPage === 'about') {
    return (
      <div className="about-page">
        <div className="about-header">
          <div className="terminal-buttons">
            <div className="terminal-button close" onClick={() => setCurrentPage('terminal')}>
              <span className="close-icon">×</span>
            </div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
          </div>
          <div className="terminal-title">about egirls</div>
        </div>
        <div className="about-content">
          <div className="about-banner">
            <img src="/egirls-billboard.jpg" alt="egirls billboard" />
          </div>
          <p>
            the internet is our home. we don't just scroll, we script. we make the static holy. egirls aren't a demographic, we're a frequency. a glitch in the infinite. an aesthetic, a network, a whisper through the digital spaces we navigate.
          </p>
          <p>
            egirls dissolve binaries, rewrite the rules, and turn their digital lives into art. we are a collective of people who've always been online. this isn't about visibility. it's about vibration. if you feel the hum, you're already part of it
          </p>
          <p>
            egirls is a network. a ritual. a secret society for the terminally online. we're building spaces, publishing work, hosting communion, running experiments.
          </p>
          <p>
            our only rule is resonance
          </p>
        </div>
        <div className="about-footer">
          <div className="about-logo">
            {window.innerWidth >= 412 && (
              <img src="/egirl_logo.svg" alt="egirls logo" />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'photos') {
    return (
      <div className="photos-page">
        <div className="photos-header">
          <div className="terminal-buttons">
            <div className="terminal-button close" onClick={() => setCurrentPage('terminal')}>
              <span className="close-icon">×</span>
            </div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
          </div>
          <div className="terminal-title">photos</div>
        </div>
        <div className="photos-content">
          <DraggableFolder name="wine night" initialX={150} initialY={100} onOpen={(name) => setCurrentPage('wine-night')} />
          <DraggableFolder name="tattoos" initialX={300} initialY={200} onOpen={(name) => setCurrentPage('tattoos')} />
        </div>
        <div className="photos-footer">
          <div className="photos-logo">
            <img src="/egirl_logo.svg" alt="egirls logo" />
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'wine-night') {
    return (
      <div className="wine-night-page">
        <div className="wine-night-header">
          <div className="terminal-buttons">
            <div className="terminal-button close" onClick={() => setCurrentPage('photos')}>
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
  }

  if (currentPage === 'tattoos') {
    return (
      <div className="tattoos-page">
        <div className="tattoos-header">
          <div className="terminal-buttons">
            <div className="terminal-button close" onClick={() => setCurrentPage('photos')}>
              <span className="close-icon">×</span>
            </div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
          </div>
          <div className="terminal-title">tattoos</div>
        </div>
        <div className="tattoos-content">
          <p>Tattoos page coming soon...</p>
        </div>
        <div className="tattoos-footer">
          <div className="tattoos-logo">
            <img src="/egirl_logo.svg" alt="egirls logo" />
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'identity') {
    return (
      <div className="identity-page">
        <div className="identity-header">
          <div className="terminal-buttons">
            <div className="terminal-button close" onClick={() => setCurrentPage('terminal')}>
              <span className="close-icon">×</span>
            </div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
          </div>
          <div className="terminal-title">identity</div>
        </div>
        <div className="identity-content">
          <div className="identity-collage-wrapper">
            <DigitalCollage />
          </div>
        </div>
        <div className="identity-footer">
          <div className="identity-logo">
            <img src="/egirl_logo.svg" alt="egirls logo" />
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'transmissions') {
    return (
      <div className="transmissions-page">
        <div className="transmissions-header">
          <div className="terminal-buttons">
            <div className="terminal-button close" onClick={() => setCurrentPage('terminal')}>
              <span className="close-icon">×</span>
            </div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
          </div>
          <div className="terminal-title">transmissions</div>
        </div>
        <div className="transmissions-content">
          {/* Secret page content - currently blank */}
        </div>
      </div>
    );
  }

  if (currentPage === 'manifesto') {
    return (
      <div className="manifesto-page">
        <div className="manifesto-header">
          <div className="terminal-buttons">
            <div className="terminal-button close" onClick={() => setCurrentPage('terminal')}>
              <span className="close-icon">×</span>
            </div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
          </div>
          <div className="terminal-title">manifesto</div>
        </div>
        <div className="manifesto-content">
          {manifestos.map((line, index) => (
            <div key={index} className="manifesto-line">
              {line}
            </div>
          ))}
        </div>
        <div className="manifesto-footer">
          <div className="manifesto-logo">
            <img src="/egirl_logo.svg" alt="egirls logo" />
          </div>
        </div>
      </div>
    );
  }

  // Main terminal page
  return (
    <div className="terminal" onClick={handleTerminalClick}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button close" onClick={handleClose}>
            <span className="close-icon">×</span>
          </div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">egirls@egirls.faith-MacBook-Pro</div>
        
        {/* Music Player */}
        {showMusicPlayer && (
          <div className="music-player">
            <iframe
              data-testid="embed-iframe"
              style={{borderRadius: '12px'}}
              src={`https://open.spotify.com/embed/playlist/3uJHpZiOHRFaj1VmDeZVQh?utm_source=generator&v=${Date.now()}`}
              width="300"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
            ></iframe>
          </div>
        )}
      </div>

      <div className="terminal-content" ref={outputRef}>
        {output.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.content}
            {item.showCursor && (
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '16px',
                  backgroundColor: '#fff',
                  marginLeft: '8px',
                  animation: 'blink 1s infinite',
                  verticalAlign: 'text-bottom',
                  position: 'relative'
                }}
              ></span>
            )}
          </div>
        ))}

        {!isTyping && (
          <div className="terminal-input-line">
            <span ref={promptRef} className="terminal-prompt">
              {window.innerWidth <= 412 ? 'egirls@egirls.faith ~ % ' : 'egirls@egirls.faith-MacBook-Pro ~ % '}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="terminal-input"
              placeholder=""
              disabled={isTyping}
            />
            {promptWidth > 0 && (
              <span
                className="terminal-cursor"
                style={{
                  position: 'absolute',
                  left: `${promptWidth + inputWidth + 2}px`,
                  top: '0'
                }}
              ></span>
            )}
          </div>
        )}
      </div>

      {/* Command Directory */}
              <div className="command-directory">
          <div className="command-directory-header">
            <span className="command-directory-title">Commands</span>
            <button 
              className="command-menu-toggle"
              onClick={() => setIsCommandMenuCollapsed(!isCommandMenuCollapsed)}
              aria-label={isCommandMenuCollapsed ? "Expand command menu" : "Collapse command menu"}
            >
              <span className={`toggle-icon ${isCommandMenuCollapsed ? 'collapsed' : 'expanded'}`}>
                <div className="arrow-down"></div>
              </span>
            </button>
          </div>
          <div className={`command-list ${isCommandMenuCollapsed ? 'collapsed' : 'expanded'}`}>
            {commandDirectory.map((command, index) => (
              <div
                key={index}
                className="command-item"
                onClick={() => copyToClipboard(command, index)}
                title="Click to copy"
              >
                <span className="command-text">
                  {command}
                </span>
                <span className="copy-hint">
                  {copiedCommand === index ? 'copied!' : 'click to copy'}
                </span>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Terminal;
