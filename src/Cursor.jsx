// src/Cursor.jsx
import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        width: "24px",                // Scale image size down here
        height: "24px",               // Scale image size down here
        backgroundImage: "url('/cursor.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        pointerEvents: "none",        // Allows clicks to pass through to buttons/links
        zIndex: 99999,                // Stays above modals and navbars
      }}
    />
  );
}