import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [bgColor, setBgColor] = useState('#f1f5f9');

  useEffect(() => {
    const darkModeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('dark')) {
          setBgColor('#0f172a');
        } else {
          setBgColor('#f1f5f9');
        }
      });
    });

    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => darkModeObserver.disconnect();
  }, []);

  return bgColor;
}