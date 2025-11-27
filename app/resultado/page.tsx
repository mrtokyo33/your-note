'use client';

import { useEffect, useRef, useState } from 'react';
import { GradeEntry } from '@/app/utils/storage';
import Link from 'next/link';

export default function ResultadoPage() {
  const [result, setResult] = useState<GradeEntry | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('lastResult');
    if (data) {
      const entry = JSON.parse(data);
      setResult(entry);
      setShowMessage(true);
    }
  }, []);

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
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 14, 39, 0.9)');
      gradient.addColorStop(0.5, 'rgba(26, 10, 62, 0.9)');
      gradient.addColorStop(1, 'rgba(15, 22, 53, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  if (!result) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-white text-2xl mb-4">Nenhum resultado para exibir</p>
          <Link
            href="/formulario"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
          >
            Voltar ao Formulário
          </Link>
        </div>
      </div>
    );
  }

  const getMessageColor = () => {
    if (result.message.includes('PASSOU')) return 'from-green-400 to-emerald-600';
    if (result.message.includes('TRIMESTRE')) return 'from-yellow-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const getGlowColor = () => {
    if (result.message.includes('PASSOU')) return 'shadow-green-500/75';
    if (result.message.includes('TRIMESTRE')) return 'shadow-yellow-500/75';
    return 'shadow-red-500/75';
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="fixed top-4 right-4 z-20 flex gap-2">
        <Link
          href="/formulario"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
        >
          Formulário
        </Link>
        <Link
          href="/minhas-notas"
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
        >
          Minhas Notas
        </Link>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <div className={`bg-gradient-to-r ${getMessageColor()} rounded-2xl p-8 shadow-2xl ${getGlowColor()} shadow-lg mb-8 animate-bounce`}>
          <p className="text-sm md:text-lg text-white mb-4 font-semibold">Matéria: {result.subject}</p>
          <h2 className="text-5xl md:text-8xl font-black text-white drop-shadow-lg mb-6">
            {result.message}
          </h2>

          <div className="bg-black/40 rounded-xl p-6 backdrop-blur-md">
            <p className="text-2xl md:text-4xl text-white font-bold mb-2">
              Nota Total: <span className="text-yellow-300">{result.totalScore.toFixed(2)}</span>
            </p>
            <div className="text-sm md:text-lg text-gray-200 space-y-1">
              <p>1º Trimestre: {result.firstTrimester} × 3 = {(result.firstTrimester * 3).toFixed(2)}</p>
              <p>2º Trimestre: {result.secondTrimester} × 3 = {(result.secondTrimester * 3).toFixed(2)}</p>
              <p>3º Trimestre: ({result.thirdTrimesterMensa} + {result.thirdTrimesterTrimestral} + {result.thirdTrimesterDiversificada} + {result.thirdTrimesterQualitativa} + {result.thirdTrimesterSimulado}) × 4 = {((result.thirdTrimesterMensa + result.thirdTrimesterTrimestral + result.thirdTrimesterDiversificada + result.thirdTrimesterQualitativa + result.thirdTrimesterSimulado) * 4).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
