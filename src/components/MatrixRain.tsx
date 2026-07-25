import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

const MatrixRain = ({ className = '' }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const fontSize = 16;
    const chars =
      '01<>/{}[]()=+-*&|;:$#@!ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト';

    const setup = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    };

    const draw = () => {
      // Trail fade using background color (cream)
      ctx.fillStyle = 'hsla(40, 30%, 96%, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head glyph: mustard yellow, trail: deep red
        if (Math.random() > 0.975) {
          ctx.fillStyle = 'hsla(42, 96%, 50%, 0.95)';
        } else {
          ctx.fillStyle = 'hsla(0, 78%, 38%, 0.55)';
        }
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const onResize = () => setup();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default MatrixRain;
