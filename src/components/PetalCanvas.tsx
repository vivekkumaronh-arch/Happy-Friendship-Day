import React, { useEffect, useRef } from 'react';

interface PetalCanvasProps {
  density?: 'normal' | 'dense';
  isTransitioning?: boolean;
}

type FlowerType = 'rose' | 'cherry' | 'sakura' | 'tulip' | 'daisy' | 'petal';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationY: number;
  rotationSpeed: number;
  rotationYSpeed: number;
  opacity: number;
  type: FlowerType;
  swingFreq: number;
  swingAmp: number;
}

interface Butterfly {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  wingAngle: number;
  wingSpeed: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  alphaSpeed: number;
  color: string;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ density = 'normal', isTransitioning = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for soft interactive displacement
    const mousePos = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePos.x = e.touches[0].clientX;
        mousePos.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const flowerTypes: FlowerType[] = ['rose', 'cherry', 'sakura', 'tulip', 'daisy', 'petal'];
    const count = isTransitioning ? 65 : (density === 'dense' ? 45 : 30);
    const petals: Petal[] = [];

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 12 + 16, // Visible size range 16px - 28px
        speedY: Math.random() * 1.0 + 0.6 + (isTransitioning ? 1.8 : 0),
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        rotationYSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.25 + 0.75,
        type: flowerTypes[i % flowerTypes.length],
        swingFreq: Math.random() * 0.02 + 0.01,
        swingAmp: Math.random() * 1.8 + 0.6,
      });
    }

    // Butterflies
    const butterflyColors = ['#f472b6', '#c084fc', '#38bdf8', '#fbbf24'];
    const butterflies: Butterfly[] = [];
    for (let i = 0; i < 3; i++) {
      butterflies.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.6) + height * 0.1,
        size: Math.random() * 5 + 12,
        speedX: (Math.random() * 0.7 + 0.4) * (i % 2 === 0 ? 1 : -1),
        speedY: Math.random() * 0.4 - 0.2,
        wingAngle: Math.random() * Math.PI,
        wingSpeed: Math.random() * 0.15 + 0.12,
        color: butterflyColors[i % butterflyColors.length],
      });
    }

    // Sparkles
    const sparkles: Sparkle[] = [];
    for (let i = 0; i < 35; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random(),
        alphaSpeed: (Math.random() * 0.015 + 0.008) * (i % 2 === 0 ? 1 : -1),
        color: i % 2 === 0 ? '#fbcfe8' : '#fef08a',
      });
    }

    let time = 0;

    // Render detailed high quality flowers
    const drawFlower = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.cos(p.rotationY) * 0.4 + 0.6); // 3D tilt/flip
      ctx.globalAlpha = p.opacity;

      ctx.shadowColor = 'rgba(219, 39, 119, 0.15)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 3;

      const r = p.size;

      if (p.type === 'rose') {
        // 🌹 Rose
        ctx.fillStyle = '#e11d48';
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
          ctx.beginPath();
          ctx.arc(Math.cos(a) * (r * 0.35), Math.sin(a) * (r * 0.35), r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#fb7185';
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
          ctx.beginPath();
          ctx.arc(Math.cos(a + 0.2) * (r * 0.2), Math.sin(a + 0.2) * (r * 0.2), r * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#881337';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'cherry') {
        // 🌸 Cherry Blossom
        ctx.fillStyle = '#f472b6';
        for (let i = 0; i < 5; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-r * 0.5, -r * 0.7, -r * 0.4, -r * 1.1, 0, -r);
          ctx.bezierCurveTo(r * 0.4, -r * 1.1, r * 0.5, -r * 0.7, 0, 0);
          ctx.fill();
          ctx.restore();
        }
        ctx.fillStyle = '#be123c';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'sakura') {
        // 🌺 Pink Sakura
        ctx.fillStyle = '#ec4899';
        for (let i = 0; i < 5; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / 5 + 0.2);
          ctx.beginPath();
          ctx.ellipse(0, -r * 0.55, r * 0.35, r * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'tulip') {
        // 🌷 Tulip
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.ellipse(-r * 0.25, -r * 0.2, r * 0.35, r * 0.55, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(r * 0.25, -r * 0.2, r * 0.35, r * 0.55, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fda4af';
        ctx.beginPath();
        ctx.ellipse(0, -r * 0.25, r * 0.3, r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'daisy') {
        // 🌼 Daisy
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 8; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / 8);
          ctx.beginPath();
          ctx.ellipse(0, -r * 0.6, r * 0.22, r * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // 💮 Soft Petal
        ctx.fillStyle = '#fbcfe8';
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.bezierCurveTo(r * 0.8, -r * 0.5, r * 0.6, r * 0.8, 0, r);
        ctx.bezierCurveTo(-r * 0.6, r * 0.8, -r * 0.8, -r * 0.5, 0, -r);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawButterfly = (b: Butterfly) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = 0.85;

      const scaleX = Math.cos(b.wingAngle);

      ctx.save();
      ctx.scale(scaleX, 1);
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.ellipse(-b.size * 0.6, -b.size * 0.4, b.size * 0.7, b.size * 0.5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-b.size * 0.5, b.size * 0.3, b.size * 0.5, b.size * 0.4, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.scale(-scaleX, 1);
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.ellipse(-b.size * 0.6, -b.size * 0.4, b.size * 0.7, b.size * 0.5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-b.size * 0.5, b.size * 0.3, b.size * 0.5, b.size * 0.4, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.ellipse(0, 0, b.size * 0.15, b.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawSparkle = (s: Sparkle) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = Math.max(0, Math.min(1, s.opacity));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(0, 0, s.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = s.color;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-s.size * 2, 0);
      ctx.lineTo(s.size * 2, 0);
      ctx.moveTo(0, -s.size * 2);
      ctx.lineTo(0, s.size * 2);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      sparkles.forEach((s) => {
        s.opacity += s.alphaSpeed;
        if (s.opacity > 1 || s.opacity < 0) s.alphaSpeed = -s.alphaSpeed;
        drawSparkle(s);
      });

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.swingFreq) * p.swingAmp + p.speedX;
        p.rotation += p.rotationSpeed;
        p.rotationY += p.rotationYSpeed;

        const dx = p.x - mousePos.x;
        const dy = p.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          p.x += (dx / dist) * 1.8;
          p.y += (dy / dist) * 1.8;
        }

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        drawFlower(p);
      });

      butterflies.forEach((b) => {
        b.x += b.speedX;
        b.y += Math.sin(time * 0.04) * 0.7 + b.speedY;
        b.wingAngle += b.wingSpeed;

        if (b.x > width + 50) b.x = -50;
        if (b.x < -50) b.x = width + 50;

        drawButterfly(b);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [density, isTransitioning]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
