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
    message = "ficou de recuperação no terceiro trimestre";
  } else if (totalScore < 60) {
    message = "FICOU DE RECUPERAÇÂO NOOB";
  } else {
    message = "PASSOU EM TUDO";
  }

  return {
    message,
    firstTrimesterScore,
    secondTrimesterScore,
    thirdTrimesterScore,
    totalScore,
  };
}
