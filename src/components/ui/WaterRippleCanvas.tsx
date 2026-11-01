import React, { useRef, useEffect, useState, useCallback } from 'react';

interface WaterRippleCanvasProps {
  imageSrc: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export const WaterRippleCanvas: React.FC<WaterRippleCanvasProps> = ({
  imageSrc,
  alt = 'Jalchabi Visual',
  className = '',
  aspectRatio = 'aspect-[16/10]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const ripplesRef = useRef<{ x: number; y: number; r: number; opacity: number; speed: number }[]>([]);
  const animFrameId = useRef<number | null>(null);

  const addRipple = useCallback((x: number, y: number) => {
    ripplesRef.current.push({
      x,
      y,
      r: 4,
      opacity: 0.75,
      speed: 2.2,
    });
    if (ripplesRef.current.length > 8) {
      ripplesRef.current.shift();
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Throttle ripple drops on motion
    if (Math.random() > 0.65) {
      addRipple(x, y);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    addRipple(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isActive = true;
    let w = canvas.offsetWidth || 400;
    let h = canvas.offsetHeight || 300;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    const updateSize = () => {
      if (!canvas) return;
      const newW = canvas.offsetWidth || 400;
      const newH = canvas.offsetHeight || 300;
      if (canvas.width !== newW) canvas.width = newW;
      if (canvas.height !== newH) canvas.height = newH;
      w = newW;
      h = newH;
    };
    window.addEventListener('resize', updateSize, { passive: true });

    const render = () => {
      if (!isActive) return;

      ctx.clearRect(0, 0, w, h);

      if (ripplesRef.current.length > 0) {
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const rip = ripplesRef.current[i];
          rip.r += rip.speed;
          rip.opacity -= 0.016;

          if (rip.opacity <= 0) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          // Liquid concentric wave rings
          ctx.save();
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(197, 139, 75, ${rip.opacity * 0.45})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Secondary inner refraction crest
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, Math.max(0, rip.r - 8), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(230, 190, 138, ${rip.opacity * 0.25})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      }

      if (isHovered || ripplesRef.current.length > 0) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    if (isHovered || ripplesRef.current.length > 0) {
      render();
    }

    return () => {
      isActive = false;
      window.removeEventListener('resize', updateSize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${aspectRatio} ${className}`}
    >
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Liquid Watercolor Ripple Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      />

      {/* Atmospheric Vignette and Golden Glass Border */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070e0c]/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl border border-[#dfb86c]/20 group-hover:border-[#dfb86c]/50 transition-colors pointer-events-none" />

      {/* Water reflection indicator badge */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-[#dfb86c]/30 bg-[#0e1b17]/80 px-2.5 py-1 text-[9px] font-mono tracking-widest text-[#dfb86c] uppercase opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#dfb86c] animate-ping" />
        Jalchabi Water Ripple
      </div>
    </div>
  );
};
