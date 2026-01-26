"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const moveCursor = (e: MouseEvent) => {
      // Move the container instantly to avoid lag
      outer.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isHoverable = target.tagName.toLowerCase() === 'a' || 
            target.tagName.toLowerCase() === 'button' ||
            target.closest('a') || 
            target.closest('button') ||
            target.classList.contains('cursor-pointer');

        if (isHoverable) {
            // Apply scale to the INNER element only
            inner.classList.add('scale-150', 'bg-theme/40');
            inner.classList.remove('bg-theme/20');
        } else {
            inner.classList.remove('scale-150', 'bg-theme/40');
            inner.classList.add('bg-theme/20');
        }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]"
      style={{ willChange: "transform" }}
    >
      <div 
        ref={innerRef}
        className="w-full h-full rounded-full border-1 border-theme bg-theme/20 transition-all duration-300 ease-out shadow-sm backdrop-blur-[1px]"
      />
    </div>
  );
}
