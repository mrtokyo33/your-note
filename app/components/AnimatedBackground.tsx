'use client';

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    // Criar muitas partículas
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 3 + 0.5,
        color: `hsla(${Math.random() * 60 + 240}, 100%, ${Math.random() * 40 + 40}%, ${Math.random() * 0.6 + 0.2})`,
      });
    }

    const animate = () => {
      // Gradiente de fundo complexo
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.25, '#1a0a3e');
      gradient.addColorStop(0.5, '#0f1635');
      gradient.addColorStop(0.75, '#1a0a3e');
      gradient.addColorStop(1, '#0a0e27');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ondas dinâmicas e complexas
      ctx.strokeStyle = `rgba(100, 150, 255, ${0.15 + Math.sin(time * 0.002) * 0.1})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 20) {
          const y = 100 + i * 60 + Math.sin((x + time * 0.7) * 0.012 + i) * 40 + Math.cos((x - time * 0.5) * 0.008) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Círculos de fundo animados
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgba(${150 + i * 30}, ${100 + i * 20}, 255, ${0.05 + Math.sin(time * 0.001 + i) * 0.03})`;
        ctx.lineWidth = 2;
        const centerX = canvas.width / 2 + Math.sin(time * 0.0005 + i) * 150;
        const centerY = canvas.height / 2 + Math.cos(time * 0.0003 + i) * 150;
        const radius = 100 + i * 80 + Math.sin(time * 0.001 + i * 2) * 50;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Atualizar e desenhar partículas
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.8 + Math.sin(time * 0.01 + particle.x) * 0.2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}
