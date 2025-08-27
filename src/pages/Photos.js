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
  // Generate random but centered positions for folders
  const getRandomCenteredPosition = () => {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Define safe zones (avoiding edges and header/footer)
    const safeZoneWidth = Math.min(viewportWidth * 0.6, 600); // 60% of viewport or max 600px
    const safeZoneHeight = Math.min(viewportHeight * 0.6, 400); // 60% of viewport or max 400px
    
    // Calculate center offsets
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    // Generate random positions within safe zones
    const randomX = centerX + (Math.random() - 0.5) * safeZoneWidth;
    const randomY = centerY + (Math.random() - 0.5) * safeZoneHeight;
    
    // Ensure folders stay within viewport bounds
    const maxX = viewportWidth - 100; // Account for folder width
    const maxY = viewportHeight - 120; // Account for folder height and header
    
    return {
      x: Math.max(50, Math.min(maxX, randomX)),
      y: Math.max(80, Math.min(maxY, randomY)) // Start below header
    };
  };

  // Generate initial positions
  const [folderPositions] = React.useState(() => ({
    wineNight: getRandomCenteredPosition(),
    tattoos: getRandomCenteredPosition()
  }));

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
