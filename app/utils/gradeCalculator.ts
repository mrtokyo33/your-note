export interface GradeCalculationResult {
  message: string;
  firstTrimesterScore: number;
  secondTrimesterScore: number;
  thirdTrimesterScore: number;
  totalScore: number;
}

export function calculateGrades(
  firstTrimester: string,
  secondTrimester: string,
  thirdTrimesterMensa: string,
  thirdTrimesterTrimestral: string,
  thirdTrimesterDiversificada: string,
  thirdTrimesterQualitativa: string,
  thirdTrimesterSimulado: string
): GradeCalculationResult {
  const first = parseFloat(firstTrimester) || 0;
  const second = parseFloat(secondTrimester) || 0;
  const mensa = parseFloat(thirdTrimesterMensa) || 0;
  const trimestral = parseFloat(thirdTrimesterTrimestral) || 0;
  const diversificada = parseFloat(thirdTrimesterDiversificada) || 0;
  const qualitativa = parseFloat(thirdTrimesterQualitativa) || 0;
  const simulado = parseFloat(thirdTrimesterSimulado) || 0;

  // Validar limites
  if (first > 10 || second > 10 || mensa > 3 || trimestral > 4 || 
      diversificada > 1 || qualitativa > 1 || simulado > 1) {
    throw new Error('Valores fora dos limites permitidos');
  }

  // Cálculos conforme especificado
  const firstTrimesterScore = first * 3;
  const secondTrimesterScore = second * 3;
  const thirdTrimesterSum =
    mensa + trimestral + diversificada + qualitativa + simulado;
  const thirdTrimesterScore = thirdTrimesterSum * 4;

  const totalScore = firstTrimesterScore + secondTrimesterScore + thirdTrimesterScore;

  let message = "";

  // Verificação da lógica
  if (thirdTrimesterSum < 6) {
    message = "FICOU DE RECUPERAÇÃO DO TRIMESTRE, VAI ESTUDAR KRL";
  } else if (totalScore < 60) {
    message = "NOOB FICOU DE FINAL HAHAHAHAHAHAHAH";
  } else {
    message = "VOCÊ PASSOU MUITO BEM PORRA";
  }

  return {
    message,
    firstTrimesterScore,
    secondTrimesterScore,
    thirdTrimesterScore,
    totalScore,
  };
}
