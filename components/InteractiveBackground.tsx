"use client";

import { useEffect, useState } from "react";

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized position (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden"
    >
      <div
        className="w-[100%] h-[100%] bg-no-repeat bg-contain bg-center transition-transform duration-100 ease-out"
        style={{
          backgroundImage: "url('/bg.svg')",
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
        }}
      />
    </div>
  );
}
