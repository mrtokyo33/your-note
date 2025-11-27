'use client';

import { useState } from 'react';
import { GradeInput } from '@/app/components/GradeInput';
import { ThirdTrimesterGrade } from '@/app/components/ThirdTrimesterGrade';
import { CalculateButton } from '@/app/components/CalculateButton';
import { ResultMessage } from '@/app/components/ResultMessage';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { calculateGrades, GradeCalculationResult } from '@/app/utils/gradeCalculator';

export default function Dashboard() {
  const [firstTrimester, setFirstTrimester] = useState('');
  const [secondTrimester, setSecondTrimester] = useState('');
  const [thirdTrimesterMensa, setThirdTrimesterMensa] = useState('');
  const [thirdTrimesterTrimestral, setThirdTrimesterTrimestral] = useState('');
  const [thirdTrimesterDiversificada, setThirdTrimesterDiversificada] = useState('');
  const [thirdTrimesterQualitativa, setThirdTrimesterQualitativa] = useState('');
  const [thirdTrimesterSimulado, setThirdTrimesterSimulado] = useState('');
  const [result, setResult] = useState<GradeCalculationResult | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleCalculate = () => {
    const calculationResult = calculateGrades(
      firstTrimester,
      secondTrimester,
      thirdTrimesterMensa,
      thirdTrimesterTrimestral,
      thirdTrimesterDiversificada,
      thirdTrimesterQualitativa,
      thirdTrimesterSimulado
    );

    setResult(calculationResult);
    setShowMessage(true);
  };

  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10 w-full h-screen p-8 flex flex-col">
        <div className="w-full flex-1 flex flex-col">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 text-center animate-pulse">
            Calculadora de Notas
          </h1>

          {/* Legenda de Cores */}
          <div className="mb-6 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-purple-500/30 text-center">
            <p className="text-xs md:text-sm text-gray-300 mb-3 font-semibold">Legenda de Resultados:</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-200">Verde = Passou</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-200">Amarelo = Recuperação 3º Trimestre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-200">Vermelho = Recuperação Final</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto">
          {/* Primeiro Trimestre */}
          <GradeInput
            label="SUA NOTA PRIMEIRO TRIMESTRE:"
            value={firstTrimester}
            onChange={setFirstTrimester}
          />

          {/* Segundo Trimestre */}
          <GradeInput
            label="SUA NOTA SEGUNDO TRIMESTRE:"
            value={secondTrimester}
            onChange={setSecondTrimester}
          />

          {/* Terceiro Trimestre */}
          <ThirdTrimesterGrade
            mensa={thirdTrimesterMensa}
            onMensaChange={setThirdTrimesterMensa}
            trimestral={thirdTrimesterTrimestral}
            onTrimestralChange={setThirdTrimesterTrimestral}
            diversificada={thirdTrimesterDiversificada}
            onDiversificadaChange={setThirdTrimesterDiversificada}
            qualitativa={thirdTrimesterQualitativa}
            onQualitativaChange={setThirdTrimesterQualitativa}
            simulado={thirdTrimesterSimulado}
            onSimuladoChange={setThirdTrimesterSimulado}
          />

          {/* Botão de Calcular */}
          <CalculateButton onClick={handleCalculate} />

            {/* Resultado */}
            <ResultMessage showMessage={showMessage} result={result} />
          </div>
        </div>
      </div>
    </>
  );
}
