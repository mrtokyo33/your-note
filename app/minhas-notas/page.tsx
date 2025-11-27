'use client';

import { useEffect, useState } from 'react';
import { GradeEntry, getEntriesFromStorage, deleteEntryFromStorage } from '@/app/utils/storage';
import Link from 'next/link';

export default function MinhasNotasPage() {
  const [entries, setEntries] = useState<GradeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEntries(getEntriesFromStorage());
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    deleteEntryFromStorage(id);
    setEntries(getEntriesFromStorage());
  };

  return (
    <div className="relative min-h-screen w-full p-4">
      <div className="fixed top-4 right-4 z-20 flex gap-2">
        <Link
          href="/formulario"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
        >
          Formulário
        </Link>
        <Link
          href="/resultado"
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
        >
          Resultado
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mt-12">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 text-center animate-pulse">
          Minhas Notas
        </h1>

        {loading ? (
          <p className="text-center text-gray-300">Carregando...</p>
        ) : entries.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-300 text-xl mb-4">Nenhuma nota registrada ainda</p>
            <Link
              href="/formulario"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 inline-block"
            >
              Adicionar Nota
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
                  {entry.subject}
                </h3>

                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <p>1º: {entry.firstTrimester} × 3 = {(entry.firstTrimester * 3).toFixed(1)}</p>
                  <p>2º: {entry.secondTrimester} × 3 = {(entry.secondTrimester * 3).toFixed(1)}</p>
                  <p>3º: ({entry.thirdTrimesterMensa} + {entry.thirdTrimesterTrimestral} + {entry.thirdTrimesterDiversificada} + {entry.thirdTrimesterQualitativa} + {entry.thirdTrimesterSimulado}) × 4 = {((entry.thirdTrimesterMensa + entry.thirdTrimesterTrimestral + entry.thirdTrimesterDiversificada + entry.thirdTrimesterQualitativa + entry.thirdTrimesterSimulado) * 4).toFixed(1)}</p>
                </div>

                <div className="border-t border-purple-500/30 pt-4 mb-4">
                  <p className="text-lg font-bold text-yellow-300 mb-2">
                    Total: {entry.totalScore.toFixed(2)}
                  </p>
                  <p className={`text-sm font-semibold ${
                    entry.message.includes('PASSOU')
                      ? 'text-green-400'
                      : entry.message.includes('TRIMESTRE')
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}>
                    {entry.message}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mb-4">
                  {new Date(entry.createdAt).toLocaleDateString('pt-BR')}
                </p>

                <button
                  onClick={() => handleDelete(entry.id)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105 text-sm font-semibold"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
