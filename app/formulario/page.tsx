'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GradeInput } from '@/app/components/GradeInput';
import { calculateGrades } from '@/app/utils/gradeCalculator';
import { sanitizeInput, saveEntryToStorage } from '@/app/utils/storage';
import Link from 'next/link';

export default function FormPage() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [firstTrimester, setFirstTrimester] = useState('');
  const [secondTrimester, setSecondTrimester] = useState('');
  const [thirdTrimesterMensa, setThirdTrimesterMensa] = useState('');
  const [thirdTrimesterTrimestral, setThirdTrimesterTrimestral] = useState('');
  const [thirdTrimesterDiversificada, setThirdTrimesterDiversificada] = useState('');
  const [thirdTrimesterQualitativa, setThirdTrimesterQualitativa] = useState('');
  const [thirdTrimesterSimulado, setThirdTrimesterSimulado] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (!subject.trim()) {
      newErrors.subject = 'Digite a matéria';
    }
    if (!firstTrimester) {
      newErrors.firstTrimester = 'Obrigatório';
    }
    if (!secondTrimester) {
      newErrors.secondTrimester = 'Obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const result = calculateGrades(
        firstTrimester,
        secondTrimester,
        thirdTrimesterMensa,
        thirdTrimesterTrimestral,
        thirdTrimesterDiversificada,
        thirdTrimesterQualitativa,
        thirdTrimesterSimulado
      );

      const entry = {
        id: Date.now().toString(),
        subject: sanitizeInput(subject),
        firstTrimester: parseFloat(firstTrimester) || 0,
        secondTrimester: parseFloat(secondTrimester) || 0,
        thirdTrimesterMensa: parseFloat(thirdTrimesterMensa) || 0,
        thirdTrimesterTrimestral: parseFloat(thirdTrimesterTrimestral) || 0,
        thirdTrimesterDiversificada: parseFloat(thirdTrimesterDiversificada) || 0,
        thirdTrimesterQualitativa: parseFloat(thirdTrimesterQualitativa) || 0,
        thirdTrimesterSimulado: parseFloat(thirdTrimesterSimulado) || 0,
        totalScore: result.totalScore,
        message: result.message,
        createdAt: new Date().toISOString(),
      };

      saveEntryToStorage(entry);

      // Passar dados para página de resultado
      sessionStorage.setItem('lastResult', JSON.stringify(entry));
      router.push('/resultado');
    } catch (error) {
      setErrors({ submit: 'Erro ao calcular. Verifique os valores.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="fixed top-4 right-4 z-20 flex gap-2">
        <Link
          href="/resultado"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
        >
          Resultado
        </Link>
        <Link
          href="/minhas-notas"
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
        >
          Minhas Notas
        </Link>
      </div>

      <div className="relative z-10 max-w-2xl w-full bg-white/5 backdrop-blur-md rounded-2xl border border-purple-500/30 p-8 shadow-2xl hover:border-purple-500/50 transition-all">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 text-center animate-pulse">
          Calculadora de Notas
        </h1>
        <p className="text-center text-gray-300 mb-8">Qual é essa matéria?</p>

        <div className="space-y-6">
          {/* Matéria */}
          <div>
            <label className="block text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
              Matéria
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value.slice(0, 100))}
              placeholder="Ex: Matemática"
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/30 focus:bg-white/20 border-purple-500/30 hover:border-purple-500/50 ${
                errors.subject ? 'border-red-500 shadow-lg shadow-red-500/30' : ''
              }`}
            />
            {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
          </div>

          {/* Primeiro Trimestre */}
          <GradeInput
            label="SUA NOTA PRIMEIRO TRIMESTRE:"
            value={firstTrimester}
            onChange={setFirstTrimester}
            max={10}
            error={errors.firstTrimester}
          />

          {/* Segundo Trimestre */}
          <GradeInput
            label="SUA NOTA SEGUNDO TRIMESTRE:"
            value={secondTrimester}
            onChange={setSecondTrimester}
            max={10}
            error={errors.secondTrimestre}
          />

          {/* Terceiro Trimestre */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
              NOTA TERCEIRO TRIMESTRE:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GradeInput
                label="Mensa"
                value={thirdTrimesterMensa}
                onChange={setThirdTrimesterMensa}
                max={3}
              />
              <GradeInput
                label="Trimestral"
                value={thirdTrimesterTrimestral}
                onChange={setThirdTrimesterTrimestral}
                max={4}
              />
              <GradeInput
                label="Diversificada"
                value={thirdTrimesterDiversificada}
                onChange={setThirdTrimesterDiversificada}
                max={1}
              />
              <GradeInput
                label="Qualitativa"
                value={thirdTrimesterQualitativa}
                onChange={setThirdTrimesterQualitativa}
                max={1}
              />
              <GradeInput
                label="Simulado"
                value={thirdTrimesterSimulado}
                onChange={setThirdTrimesterSimulado}
                max={1}
              />
            </div>
          </div>

          {errors.submit && <p className="text-red-400 text-center">{errors.submit}</p>}

          {/* Botão de Calcular */}
          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Calculando...' : 'Calcular'}
          </button>
        </div>
      </div>
    </div>
  );
}
