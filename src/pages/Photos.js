import React from 'react';
import './Photos.css';

// Draggable Folder Component
const DraggableFolder = ({ name, initialX, initialY, onOpen }) => {
  const [position, setPosition] = React.useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const wasDraggingRef = React.useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(false);
    wasDraggingRef.current = false;
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (dragStart.x !== 0 || dragStart.y !== 0) {
      const distance = Math.sqrt(
        Math.pow(e.clientX - (dragStart.x + position.x), 2) + 
        Math.pow(e.clientY - (dragStart.y + position.y), 2)
      );
      
      // If we've moved more than 5px, consider it a drag
      if (distance > 5) {
        setIsDragging(true);
        wasDraggingRef.current = true;
      }
    }
    
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    // Only open if we didn't drag
    if (!wasDraggingRef.current) {
      onOpen(name);
    }
    // Reset the ref
    wasDraggingRef.current = false;
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      setIsDragging(false);
      wasDraggingRef.current = false;
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (dragStart.x !== 0 || dragStart.y !== 0) {
      const distance = Math.sqrt(
        Math.pow(e.touches[0].clientX - (dragStart.x + position.x), 2) + 
        Math.pow(e.touches[0].clientY - (dragStart.y + position.y), 2)
      );
      
      // If we've moved more than 5px, consider it a drag
      if (distance > 5) {
        setIsDragging(true);
        wasDraggingRef.current = true;
      }
    }
    
    if (isDragging) {
      e.preventDefault(); // Prevent default scrolling
      
      requestAnimationFrame(() => {
        setPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y
        });
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  };

  React.useEffect(() => {
    if (dragStart.x !== 0 || dragStart.y !== 0) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragStart, isDragging]);

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

const Photos = ({ onClose, onNavigateToWineNight, onNavigateToTattoos }) => {
  // Generate random but centered positions for folders with better viewport handling
  const getRandomCenteredPosition = () => {
    // Get current viewport dimensions with fallbacks
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 375;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 667;
    
    // Account for header and footer areas
    const headerHeight = 44; // Header height
    const footerHeight = 80; // Footer height
    const availableHeight = viewportHeight - headerHeight - footerHeight;
    
    // Use the FULL available space - no artificial constraints
    const safeZoneWidth = viewportWidth - 40; // Full width minus 20px margins on each side
    const safeZoneHeight = availableHeight - 40; // Full available height minus 20px margins on each side
    
    // Calculate center offsets within available space
    const centerX = viewportWidth / 2;
    const centerY = headerHeight + (availableHeight / 2); // Center within available space
    
    // Generate random positions within safe zones
    const randomX = centerX + (Math.random() - 0.5) * safeZoneWidth;
    const randomY = centerY + (Math.random() - 0.5) * safeZoneHeight;
    
    // Ensure folders stay within viewport bounds with better margins
    const folderWidth = 80; // Approximate folder width
    const folderHeight = 100; // Approximate folder height
    
    const maxX = viewportWidth - folderWidth - 20; // 20px margin from right edge
    const maxY = viewportHeight - folderHeight - footerHeight - 20; // 20px margin from bottom
    const minY = headerHeight + 20; // 20px margin below header
    
    return {
      x: Math.max(20, Math.min(maxX, randomX)), // 20px margin from left edge
      y: Math.max(minY, Math.min(maxY, randomY))
    };
  };

  // Fallback positions if random positioning fails
  const getFallbackPosition = (index) => {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 375;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 667;
    
    // Account for header and footer areas
    const headerHeight = 44;
    const footerHeight = 80;
    const availableHeight = viewportHeight - headerHeight - footerHeight;
    
    // Simple grid-based fallback positioning within available space
    const gridX = index === 0 ? 0.3 : 0.7; // Left or right side
    const gridY = 0.5; // Middle of available space
    
    return {
      x: Math.max(20, Math.min(viewportWidth - 100, viewportWidth * gridX)),
      y: Math.max(headerHeight + 20, Math.min(viewportHeight - footerHeight - 180, headerHeight + (availableHeight * gridY)))
    };
  };

  // Use state to store positions and update them when viewport changes
  const [folderPositions, setFolderPositions] = React.useState(() => ({
    wineNight: getRandomCenteredPosition(),
    tattoos: getRandomCenteredPosition()
  }));

  // Update positions when viewport changes (orientation change, resize, etc.)
  React.useEffect(() => {
    const handleResize = () => {
      // Debug: Log viewport dimensions
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 375;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 667;
      console.log('Viewport dimensions:', { viewportWidth, viewportHeight });
      
      const newPositions = {
        wineNight: getRandomCenteredPosition(),
        tattoos: getRandomCenteredPosition()
      };
      
      // Validate positions are within bounds
      const headerHeight = 44;
      const footerHeight = 80;
      const availableHeight = viewportHeight - headerHeight - footerHeight;
      
      if (newPositions.wineNight.x < 0 || newPositions.wineNight.x > viewportWidth - 100 ||
          newPositions.wineNight.y < 60 || newPositions.wineNight.y > viewportHeight - 180) {
        newPositions.wineNight = getFallbackPosition(0);
      }
      
      if (newPositions.tattoos.x < 0 || newPositions.tattoos.x > viewportWidth - 100 ||
          newPositions.tattoos.y < 60 || newPositions.tattoos.y > viewportHeight - 180) {
        newPositions.tattoos = getFallbackPosition(1);
      }
      
      setFolderPositions(newPositions);
    };

    // Debounce resize events
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="photos-page">
      <div className="photos-header">
        <div className="terminal-buttons">
          <div className="terminal-button close" onClick={onClose}>
            <span className="close-icon">×</span>
          </div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">photos</div>
      </div>
      <div className="photos-content">
        <DraggableFolder 
          name="wine night" 
          initialX={folderPositions.wineNight.x} 
          initialY={folderPositions.wineNight.y} 
          onOpen={onNavigateToWineNight} 
        />
        <DraggableFolder 
          name="tattoos" 
          initialX={folderPositions.tattoos.x} 
          initialY={folderPositions.tattoos.y} 
          onOpen={onNavigateToTattoos} 
        />
      </div>
      <div className="photos-footer">
        <div className="photos-logo">
          <img src="/egirl_logo.svg" alt="egirls logo" />
        </div>
      </div>
    </div>
  );
};

export default Photos;
