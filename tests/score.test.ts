import assert from "node:assert/strict";
import test from "node:test";
import { averageScore, bestScore, getScoreBand } from "../lib/score";

test("calculates five-round summary values", () => {
  const scores = [241, 203, 219, 231, 196];
  assert.equal(averageScore(scores), 218);
  assert.equal(bestScore(scores), 196);
  assert.equal(getScoreBand(averageScore(scores)).label, "Fast");
});

test("handles empty score collections", () => {
  assert.equal(averageScore([]), 0);
  assert.equal(bestScore([]), 0);
});

test("uses stable score band boundaries", () => {
  assert.equal(getScoreBand(179).label, "Exceptional");
  assert.equal(getScoreBand(180).label, "Fast");
  assert.equal(getScoreBand(220).label, "Typical");
  assert.equal(getScoreBand(280).label, "Developing");
  assert.equal(getScoreBand(350).label, "Retest");
});
