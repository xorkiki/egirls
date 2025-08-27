import React, { useEffect, useRef, useState } from 'react';
import Terminal from './Terminal';
import './LandingPage.css';

const LandingPage = () => {
  const backgroundRef = useRef(null);
  const fadeRef = useRef(null);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Apply zoom effect based on scroll position
      if (backgroundRef.current) {
        const scale = 1 + (scrollTop * 0.005);
        backgroundRef.current.style.transform = `scale(${scale})`;
      }

      // Apply fade to black effect as you zoom in
      if (fadeRef.current) {
        const fadeProgress = Math.min(scrollTop / (window.innerHeight * 0.8), 1);
        fadeRef.current.style.opacity = fadeProgress;
      }

      // Show terminal when scroll reaches a certain point
      if (scrollTop >= window.innerHeight * 0.8) {
        setShowTerminal(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReturnFromTerminal = () => {
    setShowTerminal(false);
    // Reset scroll position to top
    window.scrollTo(0, 0);
  };

  if (showTerminal) {
    return <Terminal onClose={handleReturnFromTerminal} />;
  }

  return (
    <div className="landing-page">
      <div className="background-container">
        <div 
          className="background-image" 
          ref={backgroundRef}
          style={{
            backgroundImage: 'url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="fade-overlay" ref={fadeRef}></div>
      </div>
    </div>
  );
};

export default LandingPage;
