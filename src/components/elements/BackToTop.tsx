import React from 'react';

const BackToTop = ({ target, className }: { target: string; className?: string }) => {
  const scrollToTop = () => {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button onClick={scrollToTop} className={`fixed bottom-4 right-4 p-3 rounded-full ${className}`}>
      ↑
    </button>
  );
};

export default BackToTop;