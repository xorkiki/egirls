import React from 'react';
import './Tattoos.css';

const Tattoos = ({ onClose }) => {
  // Add ESC key functionality to close the page
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true); // Use capture phase
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [onClose]);

  return (
    <div className="tattoos-page">
      <div className="tattoos-header">
        <div className="terminal-buttons">
          <div className="terminal-button close" onClick={onClose}>
            <span className="close-icon">×</span>
          </div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">tattoos</div>
      </div>
      <div className="tattoos-content">
        {/* Featured Video - Special Layout */}
        <div className="featured-video-container">
          <video 
            className="featured-video"
            controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/photos/tattoos/EGIRL V3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay">
            <h3>EGIRL V3</h3>
            <p>Featured Collection</p>
          </div>
        </div>

        {/* Regular Videos Grid */}
        <div className="videos-grid">
          <video 
            className="tattoos-video"
            controls
            muted
            loop
            playsInline
          >
            <source src="/photos/tattoos/egirls-v2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video 
            className="tattoos-video"
            controls
            muted
            loop
            playsInline
          >
            <source src="/photos/tattoos/egirls-v3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video 
            className="tattoos-video"
            controls
            muted
            loop
            playsInline
          >
            <source src="/photos/tattoos/egirls-v4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="tattoos-footer">
        <div className="tattoos-logo">
          <img src="/egirl_logo.svg" alt="egirls logo" />
        </div>
      </div>
    </div>
  );
};

export default Tattoos;
