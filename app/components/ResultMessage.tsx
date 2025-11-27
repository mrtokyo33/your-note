'use client';

import { useEffect, useRef } from 'react';
import { GradeCalculationResult } from '@/app/utils/gradeCalculator';

interface ResultMessageProps {
  showMessage: boolean;
  result: GradeCalculationResult | null;
}

export function ResultMessage({ showMessage, result }: ResultMessageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!showMessage || !canvasRef.current || !result) return;

    const canvas = canvasRef.current;
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
      life: number;
    }> = [];

    // Criar partículas de confete
    const createConfetti = () => {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * 5 + 3,
          radius: Math.random() * 4 + 2,
          color: `hsla(${Math.random() * 360}, 100%, 50%, 0.8)`,
          life: 1,
        });
      }
    };

    createConfetti();

    const animate = () => {
      // Fundo com gradiente
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 14, 39, 0.9)');
      gradient.addColorStop(0.5, 'rgba(26, 10, 62, 0.9)');
      gradient.addColorStop(1, 'rgba(15, 22, 53, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Atualizar partículas
      particles.forEach((particle, index) => {
        particle.y += particle.vy;
        particle.x += particle.vx;
        particle.life -= 0.01;

        if (particle.life <= 0) {
          particles.splice(index, 1);
        } else {
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [showMessage, result]);

  if (!showMessage || !result) return null;

  const getMessageColor = () => {
    if (result.message.includes('PASSOU')) return 'from-green-400 to-emerald-600';
    if (result.message.includes('ficou de recuperação no terceiro')) return 'from-yellow-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const getGlowColor = () => {
    if (result.message.includes('PASSOU')) return 'shadow-green-500/75';
    if (result.message.includes('ficou de recuperação no terceiro')) return 'shadow-yellow-500/75';
    return 'shadow-red-500/75';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <div className={`bg-gradient-to-r ${getMessageColor()} rounded-2xl p-8 shadow-2xl ${getGlowColor()} shadow-lg mb-8 animate-bounce`}>
          <h2 className="text-5xl md:text-8xl font-black text-white drop-shadow-lg mb-6">
            {result.message}
          </h2>

          <div className="bg-black/40 rounded-xl p-6 backdrop-blur-md">
            <p className="text-2xl md:text-4xl text-white font-bold mb-2">
              Nota Total: <span className="text-yellow-300">{result.totalScore.toFixed(2)}</span>
            </p>
            <div className="text-sm md:text-lg text-gray-200 space-y-1">
              <p>1º Trimestre: {result.firstTrimesterScore.toFixed(2)}</p>
              <p>2º Trimestre: {result.secondTrimesterScore.toFixed(2)}</p>
              <p>3º Trimestre: {result.thirdTrimesterScore.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
