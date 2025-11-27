export interface GradeEntry {
  id: string;
  subject: string;
  firstTrimester: number;
  secondTrimester: number;
  thirdTrimesterMensa: number;
  thirdTrimesterTrimestral: number;
  thirdTrimesterDiversificada: number;
  thirdTrimesterQualitativa: number;
  thirdTrimesterSimulado: number;
  totalScore: number;
  message: string;
  createdAt: string;
}

const STORAGE_KEY = 'grade-entries';

export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

export function getEntriesFromStorage(): GradeEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erro ao recuperar dados:', e);
    return [];
  }
}

export function saveEntryToStorage(entry: GradeEntry): void {
  if (typeof window === 'undefined') return;
  try {
    const entries = getEntriesFromStorage();
    entries.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Erro ao salvar dados:', e);
  }
}

export function deleteEntryFromStorage(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const entries = getEntriesFromStorage();
    const filtered = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Erro ao deletar dados:', e);
  }
}
