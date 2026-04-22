'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    const onMove = (e: MouseEvent) => {
      outer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      inner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onEnter = () => {
      inner.classList.add('cursor-hover');
      outer.classList.add('cursor-hover');
    };

    const onLeave = () => {
      inner.classList.remove('cursor-hover');
      outer.classList.remove('cursor-hover');
    };

    const delegateEnter = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.matches && t.matches('button, a, [role="button"], input, textarea, select')) {
        onEnter();
      }
    };

    const delegateLeave = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.matches && t.matches('button, a, [role="button"], input, textarea, select')) {
        onLeave();
      }
    };

    window.addEventListener('mousemove', onMove);
    document.body.addEventListener('mouseover', delegateEnter);
    document.body.addEventListener('mouseout', delegateLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseover', delegateEnter);
      document.body.removeEventListener('mouseout', delegateLeave);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="mouseCursor cursor-outer" />
      <div ref={innerRef} className="mouseCursor cursor-inner" />
    </>
  );
}
