'use client';

interface CalculateButtonProps {
  onClick: () => void;
}

export function CalculateButton({ onClick }: CalculateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 animate-pulse hover:animate-none"
    >
      Calcular
    </button>
  );
}
