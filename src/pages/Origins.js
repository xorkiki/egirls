import React from 'react';
import './Origins.css';

const Origins = ({ onClose }) => {
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
    <div className="origins-page">
      <div className="origins-header">
        <div className="terminal-buttons">
          <div className="terminal-button close" onClick={onClose}>
            <span className="close-icon">×</span>
          </div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">origins</div>
      </div>
      <div className="origins-content">
        <div className="origins-banner">
          <img src="/brand/WhatsApp Image 2025-06-12 at 23.17.50 (2).jpeg" alt="egirls origins" />
        </div>
        <p>
          before egirls had a name it was only a shimmer, a signal moving through wires and whispers, gathering those who lived at the edges of code and culture.
        </p>
        <p>
          we carried fragments from different worlds: trading infrastructure at econia labs, markets shaped at robinhood, trading terminals at doormat.xyz, pieces of design and story. together they became more than a project, they became a myth in motion.
        </p>
        <p>
          aptos was the first to believe. their early support gave the shimmer a shape and space for egirls to come alive.
        </p>
        <p>
          our beginnings weren't forged in boardrooms but conjured in group chats, browser tabs, and long nights in the glow of screens. the internet was the cradle, half playground and half ether, a space to exist and find connection where identity kept shifting and technology kept rewriting the rules of power.
        </p>
        <p>
          egirls is what emerged from that collision, a collective born from the feed and the terminal, moving with the chaos of the web and the clarity of those who know the future isn't handed down, it's created.
        </p>
      </div>
      <div className="origins-footer">
        <div className="origins-logo">
          {window.innerWidth >= 412 && (
            <img src="/egirl_logo.svg" alt="egirls logo" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Origins;
