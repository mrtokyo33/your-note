'use client';

import { useState } from 'react';

interface ThirdTrimesterGradeProps {
  mensa: string;
  onMensaChange: (value: string) => void;
  trimestral: string;
  onTrimestralChange: (value: string) => void;
  diversificada: string;
  onDiversificadaChange: (value: string) => void;
  qualitativa: string;
  onQualitativaChange: (value: string) => void;
  simulado: string;
  onSimuladoChange: (value: string) => void;
  errors?: Record<string, string>;
}

const InputField = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-1">
        {label}:
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Digite a nota"
        className={`w-full px-4 py-2 bg-white/10 backdrop-blur-md border-2 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
          focused
            ? 'border-purple-400 shadow-lg shadow-purple-500/30 bg-white/20'
            : 'border-purple-500/30 hover:border-purple-500/50'
        }`}
      />
    </div>
  );
};

export function ThirdTrimesterGrade({
  mensa,
  onMensaChange,
  trimestral,
  onTrimestralChange,
  diversificada,
  onDiversificadaChange,
  qualitativa,
  onQualitativaChange,
  simulado,
  onSimuladoChange,
  errors = {},
}: ThirdTrimesterGradeProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
        NOTA TERCEIRO TRIMESTRE:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputField label="Mensa" value={mensa} onChange={onMensaChange} />
          {errors.mensa && <p className="text-red-400 text-sm mt-1">{errors.mensa}</p>}
        </div>
        <div>
          <InputField label="Trimestral" value={trimestral} onChange={onTrimestralChange} />
          {errors.trimestral && <p className="text-red-400 text-sm mt-1">{errors.trimestral}</p>}
        </div>
        <div>
          <InputField label="Diversificada" value={diversificada} onChange={onDiversificadaChange} />
          {errors.diversificada && <p className="text-red-400 text-sm mt-1">{errors.diversificada}</p>}
        </div>
        <div>
          <InputField label="Qualitativa" value={qualitativa} onChange={onQualitativaChange} />
          {errors.qualitativa && <p className="text-red-400 text-sm mt-1">{errors.qualitativa}</p>}
        </div>
        <div>
          <InputField label="Simulado" value={simulado} onChange={onSimuladoChange} />
          {errors.simulado && <p className="text-red-400 text-sm mt-1">{errors.simulado}</p>}
        </div>
      </div>
    </div>
  );
}
