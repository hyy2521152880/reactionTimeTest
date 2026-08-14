import assert from "node:assert/strict";
import test from "node:test";
import { averageScore, bestScore, consistencyScore, estimatedPercentile, getScoreBand } from "../lib/score";

test("calculates five-round summary values", () => {
  const scores = [241, 203, 219, 231, 196];
  assert.equal(averageScore(scores), 218);
  assert.equal(bestScore(scores), 196);
  assert.equal(getScoreBand(averageScore(scores)).label, "Fast");
});

test("handles empty score collections", () => {
  assert.equal(averageScore([]), 0);
  assert.equal(bestScore([]), 0);
  assert.equal(estimatedPercentile(0), 0);
  assert.equal(consistencyScore([]), 0);
});

test("calculates bounded comparison metrics", () => {
  assert.equal(estimatedPercentile(150), 99);
  assert.equal(estimatedPercentile(300), 73);
  assert.equal(estimatedPercentile(900), 1);
  assert.equal(consistencyScore([200, 200, 200]), 100);
  assert.ok(consistencyScore([180, 220, 260]) < 100);
});

test("uses stable score band boundaries", () => {
  assert.equal(getScoreBand(179).label, "Exceptional");
  assert.equal(getScoreBand(180).label, "Fast");
  assert.equal(getScoreBand(220).label, "Typical");
  assert.equal(getScoreBand(280).label, "Developing");
  assert.equal(getScoreBand(350).label, "Retest");
});
