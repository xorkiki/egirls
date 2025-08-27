import React from 'react';
import './Tattoos.css';

const Tattoos = ({ onClose }) => {
  // Add ESC key functionality to close the page
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
        <p>Tattoos page coming soon...</p>
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
