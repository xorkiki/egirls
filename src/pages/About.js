import React from 'react';
import './About.css';

const About = ({ onClose }) => {
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
    <div className="about-page">
      <div className="about-header">
        <div className="terminal-buttons">
          <div className="terminal-button close" onClick={onClose}>
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
};

export default About;
