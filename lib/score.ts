export type ScoreBand = {
  label: string;
  summary: string;
};

export function averageScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);
}

export function bestScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  return Math.min(...scores);
}

export function estimatedPercentile(milliseconds: number): number {
  if (!milliseconds) return 0;
  const percentile = 100 - (milliseconds - 150) * 0.18;
  return Math.max(1, Math.min(99, Math.round(percentile)));
}

export function consistencyScore(scores: number[]): number {
  if (scores.length < 2) return 0;
  const average = averageScore(scores);
  if (!average) return 0;
  const variance = scores.reduce((total, score) => total + (score - average) ** 2, 0) / scores.length;
  const coefficient = Math.sqrt(variance) / average;
  return Math.max(0, Math.min(100, Math.round((1 - coefficient) * 100)));
}

export function getScoreBand(milliseconds: number): ScoreBand {
  if (milliseconds < 180) return { label: "Exceptional", summary: "An unusually fast browser-test result." };
  if (milliseconds < 220) return { label: "Fast", summary: "A quick response under typical desktop conditions." };
  if (milliseconds < 280) return { label: "Typical", summary: "Inside the common range for an online visual test." };
  if (milliseconds < 350) return { label: "Developing", summary: "Try again rested and on the same device." };
  return { label: "Retest", summary: "Fatigue, distraction, or device delay may be affecting the result." };
}
