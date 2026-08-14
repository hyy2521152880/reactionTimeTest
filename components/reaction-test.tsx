"use client";

import { Check, Copy, Download, RotateCcw, Share2, TimerReset } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { averageScore, bestScore, consistencyScore, estimatedPercentile, getScoreBand } from "@/lib/score";

type Phase = "idle" | "waiting" | "ready" | "result" | "tooEarly" | "complete" | "interrupted";

const TOTAL_ROUNDS = 5;

function randomDelay(): number {
  const values = new Uint32Array(1);
  window.crypto.getRandomValues(values);
  return 1500 + (values[0] % 3501);
}

const phaseCopy: Record<Phase, { eyebrow: string; title: string; detail: string }> = {
  idle: { eyebrow: "Five-round test", title: "Start test", detail: "Tap the panel when you are ready." },
  waiting: { eyebrow: "Hold", title: "Wait for green", detail: "A false start will not count." },
  ready: { eyebrow: "Now", title: "Click!", detail: "React as quickly as you can." },
  result: { eyebrow: "Valid reaction", title: "Next round", detail: "Tap to continue the test." },
  tooEarly: { eyebrow: "False start", title: "Too early", detail: "Tap to reset this round." },
  complete: { eyebrow: "Test complete", title: "Results ready", detail: "Review your five valid attempts." },
  interrupted: { eyebrow: "Round paused", title: "Try that round again", detail: "The tab lost focus while timing." }
};

type ReactionTestProps = {
  label?: string;
  completionLabel?: string;
  ariaLabel?: string;
};

export function ReactionTest({ label = "Reaction lab", completionLabel = "Reaction time", ariaLabel = "Reaction time test" }: ReactionTestProps = {}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [scores, setScores] = useState<number[]>([]);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [copyStatus, setCopyStatus] = useState("Copy result");
  const [shareStatus, setShareStatus] = useState("Share score");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyAtRef = useRef<number | null>(null);

  const clearRoundTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    readyAtRef.current = null;
  }, []);

  const beginRound = useCallback(() => {
    clearRoundTimer();
    setLastScore(null);
    setPhase("waiting");
    timeoutRef.current = setTimeout(() => setPhase("ready"), randomDelay());
  }, [clearRoundTimer]);

  useEffect(() => {
    if (phase === "ready") readyAtRef.current = performance.now();
  }, [phase]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && (phase === "waiting" || phase === "ready")) {
        clearRoundTimer();
        setPhase("interrupted");
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [clearRoundTimer, phase]);

  useEffect(() => () => clearRoundTimer(), [clearRoundTimer]);

  const activate = useCallback(() => {
    if (phase === "idle" || phase === "result" || phase === "tooEarly" || phase === "interrupted") {
      beginRound();
      return;
    }
    if (phase === "waiting") {
      clearRoundTimer();
      setPhase("tooEarly");
      return;
    }
    if (phase === "ready" && readyAtRef.current !== null) {
      const reaction = Math.max(1, Math.round(performance.now() - readyAtRef.current));
      const nextScores = [...scores, reaction];
      setScores(nextScores);
      setLastScore(reaction);
      readyAtRef.current = null;
      setPhase(nextScores.length === TOTAL_ROUNDS ? "complete" : "result");
    }
  }, [beginRound, clearRoundTimer, phase, scores]);

  const reset = useCallback(() => {
    clearRoundTimer();
    setScores([]);
    setLastScore(null);
    setCopyStatus("Copy result");
    setShareStatus("Share score");
    setPhase("idle");
  }, [clearRoundTimer]);

  const average = averageScore(scores);
  const best = bestScore(scores);
  const band = getScoreBand(average);
  const percentile = estimatedPercentile(average);
  const consistency = consistencyScore(scores);
  const copy = phaseCopy[phase];

  const copyResult = useCallback(async () => {
    const text = `My reaction time: ${average} ms average, ${best} ms best over ${TOTAL_ROUNDS} rounds. Test yours at reaction-test.org`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Copy unavailable");
    }
  }, [average, best]);

  const shareScore = useCallback(async () => {
    if (!average) return;
    setShareStatus("Preparing...");
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const context = canvas.getContext("2d");
    if (!context) {
      setShareStatus("Share unavailable");
      return;
    }
    context.fillStyle = "#111820";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffcc4d";
    context.fillRect(72, 72, 72, 12);
    context.fillStyle = "#ffffff";
    context.font = "700 30px Arial";
    context.fillText("REACTION TIME TEST", 72, 145);
    context.font = "900 150px Arial";
    context.fillText(`${average}`, 72, 335);
    context.font = "700 36px Arial";
    context.fillStyle = "#aeb9c4";
    context.fillText("milliseconds average", 80, 390);
    context.fillStyle = "#ffffff";
    context.font = "700 28px Arial";
    context.fillText(`${band.label}  |  ${percentile}th estimated percentile`, 80, 470);
    context.fillStyle = "#aeb9c4";
    context.font = "500 24px Arial";
    context.fillText("reaction-time.org", 80, 550);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      setShareStatus("Share unavailable");
      return;
    }
    const file = new File([blob], "reaction-time-score.png", { type: "image/png" });
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: "My reaction time score", text: `${average} ms average reaction time`, files: [file] });
        setShareStatus("Shared");
        return;
      }
    } catch {
      setShareStatus("Share cancelled");
      return;
    }
    const link = document.createElement("a");
    link.download = file.name;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    setShareStatus("Image downloaded");
  }, [average, band.label, percentile]);

  const surfaceClass = phase === "waiting"
    ? "bg-caution text-white"
    : phase === "ready"
      ? "bg-signal text-white"
      : "bg-white text-ink";

  return (
    <section aria-label={ariaLabel} className="overflow-hidden rounded-lg border border-line bg-white shadow-console">
      <div className="flex h-11 items-center justify-between border-b border-line px-4 text-[11px] font-bold uppercase tracking-[0.08em]">
        <span className="flex items-center gap-2"><TimerReset aria-hidden="true" className="h-4 w-4 text-action" /> {label}</span>
        <span className="text-slate-500">Round {phase === "idle" ? 0 : Math.min(scores.length + 1, TOTAL_ROUNDS)}/{TOTAL_ROUNDS}</span>
      </div>
      <div className="h-1 bg-paper" aria-hidden="true"><div className="h-full bg-action transition-[width]" style={{ width: `${(scores.length / TOTAL_ROUNDS) * 100}%` }} /></div>

      <button
        type="button"
        className={`test-surface group relative flex min-h-[320px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden px-5 text-center focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-marker active:scale-[0.998] md:min-h-[400px] ${surfaceClass}`}
        onPointerDown={activate}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate();
          }
        }}
        aria-label={`${copy.title}. ${copy.detail}`}
        data-phase={phase}
        data-test-surface
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-8 items-end justify-between px-3 text-[9px] opacity-50">
          {Array.from({ length: 21 }, (_, index) => <i className="h-2 border-l border-current not-italic" key={index}>{index % 5 === 0 ? index : ""}</i>)}
        </div>
        {phase === "complete" ? (
          <div className="grid w-full max-w-2xl gap-7 px-1 text-left md:grid-cols-[1fr_1.15fr] md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-action">{copy.eyebrow}</p>
              <p className="data-number text-7xl font-black leading-none md:text-8xl" data-average>{average}<span className="ml-2 text-xl">ms</span></p>
              <p className="mt-3 text-sm text-slate-600">Average {completionLabel.toLowerCase()}</p>
            </div>
            <dl className="border-t border-line text-sm">
              <div className="flex justify-between border-b border-line py-3"><dt className="text-slate-500">Best attempt</dt><dd className="data-number font-bold" data-best>{best} ms</dd></div>
              <div className="flex justify-between border-b border-line py-3"><dt className="text-slate-500">Score band</dt><dd className="font-bold">{band.label}</dd></div>
              <div className="flex justify-between border-b border-line py-3"><dt className="text-slate-500">Estimated percentile</dt><dd className="font-bold">{percentile}th</dd></div>
              <div className="flex justify-between border-b border-line py-3"><dt className="text-slate-500">Consistency</dt><dd className="font-bold">{consistency}%</dd></div>
            </dl>
          </div>
        ) : (
          <>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em] opacity-70">{copy.eyebrow}</p>
            {lastScore !== null && phase === "result" ? (
              <p className="data-number text-7xl font-black leading-none md:text-8xl" data-last-score>{lastScore}<span className="ml-2 text-xl">ms</span></p>
            ) : (
              <h2 className="text-4xl font-black uppercase md:text-6xl">{copy.title}</h2>
            )}
            <p className="mt-4 text-sm opacity-75">{copy.detail}</p>
            {phase === "idle" ? <p className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] opacity-60"><span className="rounded border border-current px-2 py-1">Click anywhere</span><span>or press Space</span></p> : null}
          </>
        )}
      </button>

      <p className="sr-only" aria-live="polite">{copy.title}. {copy.detail}</p>

      <div className="grid grid-cols-5 border-t border-line bg-white" aria-label="Attempt results">
        {Array.from({ length: TOTAL_ROUNDS }, (_, index) => (
          <div className="flex min-h-14 flex-col items-center justify-center border-r border-line text-[10px] last:border-r-0" key={index}>
            <span className="text-slate-400">R{index + 1}</span>
            <strong className="data-number mt-1 text-xs">{scores[index] ? `${scores[index]} ms` : "--"}</strong>
          </div>
        ))}
      </div>

      {phase === "complete" ? (
        <div className="flex flex-wrap items-center gap-3 border-t border-line p-4">
          <button type="button" onClick={reset} className="inline-flex min-h-10 items-center gap-2 rounded-md bg-action px-4 text-sm font-bold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-action">
            <RotateCcw aria-hidden="true" className="h-4 w-4" /> Test again
          </button>
          <button type="button" onClick={copyResult} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-4 text-sm font-bold hover:bg-paper focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-action">
            {copyStatus === "Copied" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />} {copyStatus}
          </button>
          <button type="button" onClick={shareScore} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-4 text-sm font-bold hover:bg-paper focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-action">
            {shareStatus === "Image downloaded" ? <Download aria-hidden="true" className="h-4 w-4" /> : <Share2 aria-hidden="true" className="h-4 w-4" />} {shareStatus}
          </button>
          <p className="w-full text-xs text-slate-500 md:ml-auto md:w-auto">{band.summary}</p>
          <p className="w-full text-[11px] leading-5 text-slate-400">Estimated percentile is based on a general online benchmark, not a clinical or population statistic.</p>
        </div>
      ) : null}
    </section>
  );
}
