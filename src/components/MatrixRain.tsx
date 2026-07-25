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
    let colSnippets: string[] = [];
    let colOffsets: number[] = [];

    const fontSize = 16;

    const codeLines = [
      "const app = express();",
      "import React from 'react';",
      "export default function App() {",
      "return <div>{children}</div>;",
      "useEffect(() => fetch(url), []);",
      "const [state, setState] = useState(0);",
      "if (user?.role === 'admin') return true;",
      "await supabase.from('sites').select('*');",
      "npm install react react-dom",
      "git commit -m 'feat: hero matrix rain'",
      "SELECT * FROM users WHERE id = $1;",
      "function sum(a, b) { return a + b; }",
      "console.log('Hello, Oredy!');",
      "for (let i = 0; i < n; i++) arr.push(i);",
      "<?php echo $post->post_title; ?>",
      "add_action('init', 'oredy_setup');",
      "public function index() { return view('home'); }",
      "docker run -p 8080:80 nginx:alpine",
      "curl -X POST https://api.lygos.tech/gateway",
      "type User = { id: string; email: string };",
      "className='flex items-center justify-center'",
      "border-radius: 0.75rem;",
      "background: hsl(var(--primary));",
      "@media (max-width: 768px) { ... }",
      "router.get('/api/posts', handler);",
      "throw new Error('Unauthorized');",
      "try { await save(); } catch (e) { log(e); }",
      "const { data, error } = await query;",
      "npx vite build --mode production",
    ];

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
      colSnippets = new Array(columns)
        .fill(0)
        .map(() => codeLines[Math.floor(Math.random() * codeLines.length)]);
      colOffsets = new Array(columns)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100));
    };

    const draw = () => {
      // Trail fade using background color (cream)
      ctx.fillStyle = 'hsla(40, 30%, 96%, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;

      for (let i = 0; i < columns; i++) {
        const snippet = colSnippets[i];
        const idx = (Math.floor(drops[i]) + colOffsets[i]) % snippet.length;
        const text = snippet.charAt(idx);
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
          colSnippets[i] =
            codeLines[Math.floor(Math.random() * codeLines.length)];
          colOffsets[i] = Math.floor(Math.random() * 100);
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
