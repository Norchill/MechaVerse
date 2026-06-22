/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Number of flakes based on screen density
    const flakeCount = Math.min(100, Math.floor((width * height) / 12000));
    const flakes: Array<{
      x: number;
      y: number;
      radius: number;
      density: number;
      opacity: number;
      speedY: number;
      speedX: number;
    }> = [];

    // Initialize snow flakes
    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.5, // tiny crystals and soft flakes
        density: Math.random() * flakeCount,
        opacity: Math.random() * 0.4 + 0.1,
        speedY: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 1.0 - 0.5,
      });
    }

    // Keep track of mouse coordinates to skew wind
    let targetWindX = 0;
    let currentWindX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Skew wind depending on mouse position relative to center
      const centerX = window.innerWidth / 2;
      targetWindX = (e.clientX - centerX) / centerX * 1.2; // wind speed modifier range: -1.2 to 1.2
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate wind speed
      currentWindX += (targetWindX - currentWindX) * 0.05;

      ctx.fillStyle = 'rgba(230, 242, 255, 1)'; // very cold icy blue-white color

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        ctx.beginPath();
        // Create fluffy soft radial gradient for beautiful realistic render
        ctx.fillStyle = `rgba(220, 240, 255, ${f.opacity})`;
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, true);
        ctx.fill();

        // Update position
        f.y += f.speedY;
        f.x += f.speedX + currentWindX;

        // Wrap around borders mapping
        if (f.y > height) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width) {
          f.x = 0;
        } else if (f.x < 0) {
          f.x = width;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="arctic-snow-canvas"
      className="fixed inset-0 pointer-events-none z-25"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
