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

export function getScoreBand(milliseconds: number): ScoreBand {
  if (milliseconds < 180) return { label: "Exceptional", summary: "An unusually fast browser-test result." };
  if (milliseconds < 220) return { label: "Fast", summary: "A quick response under typical desktop conditions." };
  if (milliseconds < 280) return { label: "Typical", summary: "Inside the common range for an online visual test." };
  if (milliseconds < 350) return { label: "Developing", summary: "Try again rested and on the same device." };
  return { label: "Retest", summary: "Fatigue, distraction, or device delay may be affecting the result." };
}
