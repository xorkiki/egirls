import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Terminal.css';

// Wine Night Photos Array - Cleaned and Optimized
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

// Individual Photo Component
const PhotoItem = ({ photo, index, scrollYProgress }) => {
  // Randomized scale curves for each image
  const maxScale = 1.0 + Math.random() * 0.2; // 1.0 to 1.2
  const minScale = 0.4 + Math.random() * 0.2; // 0.4 to 0.6
  
  // Slight vertical offset for collage effect
  const verticalOffset = (Math.random() * 50) - 25; // ±25px up/down
  
  // Calculate initial horizontal position (spread across screen)
  const initialX = (index * 350) - (wineNightPhotos.length * 175); // Center the spread
  
  // Horizontal translation based on scroll progress
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [initialX, initialX - 1000] // Move left as scroll progresses
  );
  
  // Scale based on horizontal position (center = max scale)
  const scale = useTransform(
    translateX,
    [-200, 0, 200], // Center area
    [minScale, maxScale, minScale] // Scale down, up, down
  );
  
  // Z-index based on scale for layering
  const zIndex = useTransform(scale, [minScale, maxScale], [1, 100]);

  return (
    <motion.div
      className="photo-item"
      style={{
        translateX,
        translateY: verticalOffset,
        scale,
        zIndex,
        position: 'absolute'
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img 
        src={photo} 
        alt={`Wine night photo ${index + 1}`}
        loading="lazy"
        style={{
          width: '300px',
          height: '400px',
          objectFit: 'cover',
          borderRadius: '8px',
          opacity: 0,
          transition: 'opacity 0.3s ease-in'
        }}
        onLoad={(e) => { e.target.style.opacity = '1'; }}
        onError={(e) => { 
          console.error('Failed to load wine night photo:', photo); 
          e.target.style.opacity = '0.5'; 
        }}
      />
    </motion.div>
  );
};

// Photo Timeline Component
const PhotoTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="photo-timeline-container" ref={containerRef}>
      <div className="photo-timeline">
        {wineNightPhotos.map((photo, index) => (
          <PhotoItem 
            key={index}
            photo={photo}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

// Digital Collage Component with responsive positioning
const DigitalCollage = () => {
  const containerRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [visibleImages, setVisibleImages] = useState(new Set());

  // Brand photos array
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

  // Responsive image positioning based on screen size
  const imageStyles = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isTinyMobile = window.innerWidth <= 360;
    
    // Responsive dimensions
    let imageWidth, imageHeight;
    if (isTinyMobile) {
      imageWidth = 80;
      imageHeight = 60;
    } else if (isSmallMobile) {
      imageWidth = 120;
      imageHeight = 90;
    } else if (isMobile) {
      imageWidth = 200;
      imageHeight = 150;
    } else {
      imageWidth = 400;
      imageHeight = 300;
    }

    const padding = isMobile ? 15 : 25;
    const minSpacing = isMobile ? 30 : 50;
    const headerHeight = 45;
    const footerHeight = 120;
    const safeHeight = window.innerHeight - headerHeight - footerHeight;
    const centerX = window.innerWidth / 2;
    const centerY = headerHeight + (safeHeight / 2);
    const availableWidth = window.innerWidth - (padding * 2);
    const availableHeight = safeHeight - (padding * 2);
    
    // Adjust spread factor for mobile
    const spreadFactor = isMobile ? 0.95 : 0.8;
    const maxOffsetX = (availableWidth * spreadFactor) / 2;
    const maxOffsetY = (availableHeight * spreadFactor) / 2;
    
    const placedImages = [];
    
    return brandPhotos.map((_, index) => {
      let attempts = 0;
      let posX, posY;
      let validPosition = false;
      
      while (attempts < 50 && !validPosition) {
        attempts++;
        
        // Use different distribution patterns for mobile vs desktop
        if (isMobile) {
          // Mobile: More grid-like distribution for better screen coverage
          const gridCols = Math.ceil(Math.sqrt(brandPhotos.length));
          const gridRows = Math.ceil(brandPhotos.length / gridCols);
          const gridCol = index % gridCols;
          const gridRow = Math.floor(index / gridCols);
          
          const cellWidth = availableWidth / gridCols;
          const cellHeight = availableHeight / gridRows;
          
          const gridX = (gridCol * cellWidth) - (availableWidth / 2) + (cellWidth / 2);
          const gridY = (gridRow * cellHeight) - (availableHeight / 2) + (cellHeight / 2);
          
          // Add some randomness within each grid cell
          const randomX = (Math.random() - 0.5) * (cellWidth * 0.3);
          const randomY = (Math.random() - 0.5) * (cellHeight * 0.3);
          
          posX = centerX + gridX + randomX - (imageWidth / 2);
          posY = centerY + gridY + randomY - (imageHeight / 2);
        } else {
          // Desktop: Original clustering algorithm
          const clusterWidth = availableWidth * 0.7;
          const clusterHeight = availableHeight * 0.7;
          const gridCols = Math.ceil(Math.sqrt(brandPhotos.length));
          const gridRows = Math.ceil(brandPhotos.length / gridCols);
          const gridCol = index % gridCols;
          const gridRow = Math.floor(index / gridCols);
          const cellWidth = clusterWidth / gridCols;
          const cellHeight = clusterHeight / gridRows;
          const gridX = (gridCol * cellWidth) - (clusterWidth / 2) + (cellWidth / 2);
          const gridY = (gridRow * cellHeight) - (clusterHeight / 2) + (cellHeight / 2);
          const randomX = (Math.random() - 0.5) * (cellWidth * 0.5);
          const randomY = (Math.random() - 0.5) * (cellHeight * 0.5);
          posX = centerX + gridX + randomX - (imageWidth / 2);
          posY = centerY + gridY + randomY - (imageHeight / 2);
        }
        
        // Clamp positions to viewport bounds
        const minX = padding;
        const maxX = window.innerWidth - imageWidth - padding;
        const minY = headerHeight + padding;
        const maxY = window.innerHeight - footerHeight - imageHeight - padding;
        
        posX = Math.max(minX, Math.min(maxX, posX));
        posY = Math.max(minY, Math.min(maxY, posY));
        
        validPosition = true;
        
        // Check collision with other images
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
  }, [brandPhotos, dragOffset.x, dragOffset.y, isDragging]);

  // Mouse and touch event handlers
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setDragOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      setDragOffset({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageIndex = parseInt(entry.target.dataset.index);
            setVisibleImages(prev => new Set([...prev, imageIndex]));
          }
        });
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    const imageContainers = containerRef.current?.querySelectorAll('.collage-image');
    imageContainers?.forEach((container, index) => {
      container.dataset.index = index;
      observer.observe(container);
    });

    return () => observer.disconnect();
  }, []);

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
      {brandPhotos.map((photo, index) => (
        <div
          key={index}
          className={`collage-image ${hoveredImage === index ? 'hovered' : ''}`}
          style={imageStyles[index]}
          onMouseEnter={() => setHoveredImage(index)}
          onMouseLeave={() => setHoveredImage(null)}
        >
          {visibleImages.has(index) ? (
            <img
              src={photo}
              alt={`Brand asset ${index + 1}`}
              draggable="false"
              loading="lazy"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{
                opacity: loadedImages.has(index) ? 1 : 0,
                transition: 'opacity 0.3s ease-in'
              }}
              onLoad={(e) => {
                setLoadedImages(prev => new Set([...prev, index]));
                e.target.style.opacity = '1';
              }}
              onError={(e) => {
                console.error('Failed to load image:', photo);
                e.target.style.opacity = '0.5';
              }}
            />
          ) : (
            <div
              className="image-placeholder"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px'
              }}
            >
              Loading...
            </div>
          )}
        </div>
      ))}
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
    >
      <img src="/macOSfolder.png" alt="folder" className="folder-icon" />
      <span className="folder-name">{name}</span>
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
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const promptRef = useRef(null);

  const commands = {
    'help': 'Available commands:\n• cd about/ - Navigate to about page\n• cd photos/ - Navigate to photos page\n• cd brand/ - Navigate to brand page\n• cat manifesto.txt - Display manifesto in terminal\n• help - Show this help\n• clear - Clear terminal\n• exit - Return to landing page',
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

  const commandDirectory = [
    'cd about/',
    'cd photos/',
    'cd brand/',
    'cat manifesto.txt'
  ];

  useEffect(() => {
    // Add initial terminal output - only the login message, no prompt
    setOutput([
      { type: 'system', content: 'Last login: Tue Nov 11 11:11:11 on console' }
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
        }
      }, 50);
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
    let currentOutput = [...output];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '') {
        currentOutput.push({ type: 'output', content: '' });
        setOutput([...currentOutput]);
        await new Promise(resolve => setTimeout(resolve, speed));
        continue;
      }

      let currentLine = '';
      for (let j = 0; j < line.length; j++) {
        currentLine += line[j];
        currentOutput[currentOutput.length - 1] = { type: 'output', content: currentLine };
        setOutput([...currentOutput]);
        await new Promise(resolve => setTimeout(resolve, speed));
      }

      if (i < lines.length - 1) {
        currentOutput.push({ type: 'output', content: '' });
        setOutput([...currentOutput]);
      }
    }

    // Add new prompt
    currentOutput.push({ type: 'system', content: 'egirls@egirls.faith-MacBook-Pro ~ % ' });
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
    } else if (trimmedCommand === 'cd brand/') {
      setCurrentPage('brand');
    } else if (trimmedCommand === 'cat manifesto.txt') {
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
            <img src="/egirl_logo.svg" alt="egirls logo" />
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
        </div>
      </div>
    );
  }

  if (currentPage === 'brand') {
    return (
      <div className="brand-page">
        <div className="brand-header">
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

  if (currentPage === 'manifesto') {
    return (
      <div className="manifesto-page">
        <div className="manifesto-header">
          <button className="back-button" onClick={() => setCurrentPage('terminal')}>
            ← Back to Terminal
          </button>
          <h1>Digital Manifesto</h1>
        </div>
        <div className="manifesto-content">
          {manifestos.map((line, index) => (
            <div key={index} className="manifesto-line">
              {line}
            </div>
          ))}
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
      </div>

      <div className="terminal-content" ref={outputRef}>
        {output.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.content}
          </div>
        ))}

        {!isTyping && (
          <div className="terminal-input-line">
            <span ref={promptRef} className="terminal-prompt">egirls@egirls.faith-MacBook-Pro ~ % </span>
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
            <span
              className="terminal-cursor"
              style={{
                position: 'absolute',
                left: `${promptWidth + (inputValue.length * 8.5) + 6}px`,
                top: '0'
              }}
            ></span>
          </div>
        )}
      </div>

      {/* Command Directory */}
      <div className="command-directory">
        <div className="command-directory-header">
          <span className="command-directory-title">Commands</span>
        </div>
        <div className="command-list">
          {commandDirectory.map((command, index) => (
            <div
              key={index}
              className="command-item"
              onClick={() => copyToClipboard(command, index)}
              title="Click to copy"
            >
              <span className="command-text">{command}</span>
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
