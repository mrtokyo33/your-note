'use client';

import { useState } from 'react';

interface GradeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function GradeInput({ label, value, onChange }: GradeInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group">
      <label className="block text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Digite a nota"
        className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
          focused
            ? 'border-purple-400 shadow-lg shadow-purple-500/30 bg-white/20'
            : 'border-purple-500/30 hover:border-purple-500/50'
        }`}
      />
    </div>
  );
}
