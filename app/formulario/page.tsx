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

    // Validações obrigatórias e de limites
    if (!firstTrimester) {
      newErrors.firstTrimester = 'Obrigatório';
    } else {
      const first = parseFloat(firstTrimester);
      if (first < 0 || first > 10) {
        newErrors.firstTrimester = 'Deve estar entre 0 e 10';
      }
    }

    if (!secondTrimester) {
      newErrors.secondTrimester = 'Obrigatório';
    } else {
      const second = parseFloat(secondTrimester);
      if (second < 0 || second > 10) {
        newErrors.secondTrimester = 'Deve estar entre 0 e 10';
      }
    }

    // Validar terceiro trimestre
    const mensa = parseFloat(thirdTrimesterMensa) || 0;
    const trimestral = parseFloat(thirdTrimesterTrimestral) || 0;
    const diversificada = parseFloat(thirdTrimesterDiversificada) || 0;
    const qualitativa = parseFloat(thirdTrimesterQualitativa) || 0;
    const simulado = parseFloat(thirdTrimesterSimulado) || 0;

    if (mensa < 0 || mensa > 3) {
      newErrors.mensa = 'Deve estar entre 0 e 3';
    }
    if (trimestral < 0 || trimestral > 4) {
      newErrors.trimestral = 'Deve estar entre 0 e 4';
    }
    if (diversificada < 0 || diversificada > 1) {
      newErrors.diversificada = 'Deve estar entre 0 e 1';
    }
    if (qualitativa < 0 || qualitativa > 1) {
      newErrors.qualitativa = 'Deve estar entre 0 e 1';
    }
    if (simulado < 0 || simulado > 1) {
      newErrors.simulado = 'Deve estar entre 0 e 1';
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
            error={errors.secondTrimester}
          />

          {/* Terceiro Trimestre */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
              NOTA TERCEIRO TRIMESTRE:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <GradeInput
                  label="Mensa"
                  value={thirdTrimesterMensa}
                  onChange={setThirdTrimesterMensa}
                  max={3}
                />
                {errors.mensa && <p className="text-red-400 text-sm mt-1">{errors.mensa}</p>}
              </div>
              <div>
                <GradeInput
                  label="Trimestral"
                  value={thirdTrimesterTrimestral}
                  onChange={setThirdTrimesterTrimestral}
                  max={4}
                />
                {errors.trimestral && <p className="text-red-400 text-sm mt-1">{errors.trimestral}</p>}
              </div>
              <div>
                <GradeInput
                  label="Diversificada"
                  value={thirdTrimesterDiversificada}
                  onChange={setThirdTrimesterDiversificada}
                  max={1}
                />
                {errors.diversificada && <p className="text-red-400 text-sm mt-1">{errors.diversificada}</p>}
              </div>
              <div>
                <GradeInput
                  label="Qualitativa"
                  value={thirdTrimesterQualitativa}
                  onChange={setThirdTrimesterQualitativa}
                  max={1}
                />
                {errors.qualitativa && <p className="text-red-400 text-sm mt-1">{errors.qualitativa}</p>}
              </div>
              <div>
                <GradeInput
                  label="Simulado"
                  value={thirdTrimesterSimulado}
                  onChange={setThirdTrimesterSimulado}
                  max={1}
                />
                {errors.simulado && <p className="text-red-400 text-sm mt-1">{errors.simulado}</p>}
              </div>
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
