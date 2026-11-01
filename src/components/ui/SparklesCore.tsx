import React, { useRef, useEffect } from 'react';

interface SparklesCoreProps {
  id?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id = 'sparkles-canvas',
  minSize = 0.8,
  maxSize = 2.0,
  particleDensity = 25,
  className = '',
  particleColor = '#e5c378',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;

    // Pause animation when hero is off-screen to save 100% CPU/GPU cycles
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { root: null, threshold: 0 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth;
      const newH = canvas.parentElement.clientHeight;
      if (canvas.width !== newW) canvas.width = newW;
      if (canvas.height !== newH) canvas.height = newH;
      width = newW;
      height = newH;
    };

    window.addEventListener('resize', handleResize);

    // Generate initial particle flock
    const particles: Particle[] = [];
    const count = Math.min(Math.max(Math.floor((width * height) / 24000) * (particleDensity / 25), 8), 16);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.15, // Gentle upward draft
        opacity: Math.random() * 0.6,
        maxOpacity: Math.random() * 0.5 + 0.3,
        fadeSpeed: Math.random() * 0.008 + 0.004,
      });
    }

    const render = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        p.opacity += p.fadeSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.08) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.max(0, Math.min(p.opacity, 0.85));
        // Removed expensive ctx.shadowBlur to eliminate GPU fillrate bottlenecks
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
