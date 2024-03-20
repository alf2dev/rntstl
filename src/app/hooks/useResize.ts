import { useEffect } from 'react';

export const useResize = (
  onChange: (width: number) => void,
  interval = 100,
  element?: Window | HTMLDivElement | null | undefined,
) => {
  useEffect(() => {
    if (element === null) {
      return;
    }
    if (element === undefined) {
      element = window;
    }
    let timer: NodeJS.Timeout;
    let handleResize: () => void;
    if (element instanceof Window) {
      const windowElement = element;
      handleResize = () => {
        if (timer) clearTimeout(timer);
        const width = windowElement.innerWidth;
        timer = setTimeout(onChange, interval, width);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else if (element instanceof HTMLDivElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (timer) clearTimeout(timer);
          const width = entry.contentRect.width;
          timer = setTimeout(onChange, interval, width);
        }
      });
      resizeObserver.observe(element);
      return () => resizeObserver.disconnect();
    }
  }, [element]);
};
