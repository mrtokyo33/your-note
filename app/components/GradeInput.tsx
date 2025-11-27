'use client';

import { useState } from 'react';

interface GradeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max?: number;
  error?: string;
}

export function GradeInput({ label, value, onChange, max = 10, error }: GradeInputProps) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: string) => {
    if (e === '') {
      onChange(e);
      return;
    }
    const num = parseFloat(e);
    if (!isNaN(num) && num >= 0 && num <= max) {
      onChange(e);
    }
  };

  return (
    <div className="group">
      <label className="block text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
        {label}
        <span className="text-sm text-gray-300 ml-2">(até {max})</span>
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Digite a nota"
          max={max}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
            focused
              ? 'border-purple-400 shadow-lg shadow-purple-500/30 bg-white/20'
              : 'border-purple-500/30 hover:border-purple-500/50'
          } ${error ? 'border-red-500 shadow-lg shadow-red-500/30' : ''}`}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
