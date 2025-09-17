import React from 'react';
import './Tattoos.css';

const Tattoos = ({ onClose }) => {
  const [videoErrors, setVideoErrors] = React.useState({});
  const [videoLoading, setVideoLoading] = React.useState({});

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

  const handleVideoError = (videoName, error) => {
    console.error(`Video ${videoName} error:`, error);
    setVideoErrors(prev => ({ ...prev, [videoName]: error }));
  };

  const handleVideoLoadStart = (videoName) => {
    console.log(`Video ${videoName} loading started`);
    setVideoLoading(prev => ({ ...prev, [videoName]: true }));
  };

  const handleVideoCanPlay = (videoName) => {
    console.log(`Video ${videoName} can play`);
    setVideoLoading(prev => ({ ...prev, [videoName]: false }));
  };

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
        {/* Videos - Grid Layout */}
        <div className="videos-grid">
          <div className="video-container">
            {videoLoading['egirls-v4'] && <div className="video-loading">Loading egirls-v4...</div>}
            {videoErrors['egirls-v4'] && <div className="video-error">Error loading egirls-v4: {videoErrors['egirls-v4'].message}</div>}
            <video 
              className="tattoos-video"
              controls
              autoPlay
              muted
              loop
              playsInline
              onError={(e) => handleVideoError('egirls-v4', e)}
              onLoadStart={() => handleVideoLoadStart('egirls-v4')}
              onCanPlay={() => handleVideoCanPlay('egirls-v4')}
            >
              <source src="/photos/tattoos/egirls-v4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-container">
            {videoLoading['EGIRL V3'] && <div className="video-loading">Loading EGIRL V3...</div>}
            {videoErrors['EGIRL V3'] && <div className="video-error">Error loading EGIRL V3: {videoErrors['EGIRL V3'].message}</div>}
            <video 
              className="tattoos-video"
              controls
              muted
              loop
              playsInline
              onError={(e) => handleVideoError('EGIRL V3', e)}
              onLoadStart={() => handleVideoLoadStart('EGIRL V3')}
              onCanPlay={() => handleVideoCanPlay('EGIRL V3')}
            >
              <source src="/photos/tattoos/EGIRL V3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-container">
            {videoLoading['EGIRL V1'] && <div className="video-loading">Loading EGIRL V1...</div>}
            {videoErrors['EGIRL V1'] && <div className="video-error">Error loading EGIRL V1: {videoErrors['EGIRL V1'].message}</div>}
            <video 
              className="tattoos-video"
              controls
              muted
              loop
              playsInline
              onError={(e) => handleVideoError('EGIRL V1', e)}
              onLoadStart={() => handleVideoLoadStart('EGIRL V1')}
              onCanPlay={() => handleVideoCanPlay('EGIRL V1')}
            >
              <source src="/photos/tattoos/EGIRL V1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-container">
            {videoLoading['EGIRL V4'] && <div className="video-loading">Loading EGIRL V4...</div>}
            {videoErrors['EGIRL V4'] && <div className="video-error">Error loading EGIRL V4: {videoErrors['EGIRL V4'].message}</div>}
            <video 
              className="tattoos-video"
              controls
              muted
              loop
              playsInline
              onError={(e) => handleVideoError('EGIRL V4', e)}
              onLoadStart={() => handleVideoLoadStart('EGIRL V4')}
              onCanPlay={() => handleVideoCanPlay('EGIRL V4')}
            >
              <source src="/photos/tattoos/EGIRL V4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-container">
            {videoLoading['EGIRLS V2'] && <div className="video-loading">Loading EGIRLS V2...</div>}
            {videoErrors['EGIRLS V2'] && <div className="video-error">Error loading EGIRLS V2: {videoErrors['EGIRLS V2'].message}</div>}
            <video 
              className="tattoos-video"
              controls
              muted
              loop
              playsInline
              onError={(e) => handleVideoError('EGIRLS V2', e)}
              onLoadStart={() => handleVideoLoadStart('EGIRLS V2')}
              onCanPlay={() => handleVideoCanPlay('EGIRLS V2')}
            >
              <source src="/photos/tattoos/EGIRLS V2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
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
