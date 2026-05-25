import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[1] transition-all duration-300 ease-out"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(3, 169, 244,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}
