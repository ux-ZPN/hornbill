import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;

    let ringX = 0, ringY = 0;
    let curX  = 0, curY  = 0;
    let raf;

    const onMove = (e) => {
      curX = e.clientX;
      curY = e.clientY;
      cursor.style.left = curX + 'px';
      cursor.style.top  = curY + 'px';
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, curX, 0.14);
      ringY = lerp(ringY, curY, 0.14);
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      raf = requestAnimationFrame(animate);
    };

    const onDown = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.2)';
      ring.style.transform   = 'translate(-50%,-50%) scale(0.5)';
    };
    const onUp = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    };

    /* Grow ring on hoverable elements */
    const onEnter = () => { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.opacity = '0.5'; };
    const onLeave = () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '1'; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const hoverEls = document.querySelectorAll('a, button, [data-hover]');
    hoverEls.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      hoverEls.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
      cancelAnimationFrame(raf);
    };
  }, []);
}
