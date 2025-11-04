// src/lib/gamification.js
export function computeWeeklyPoints(spent, budget) {
  // stay under budget -> base points
  const base = spent <= budget ? 100 : 0;
  // extra points if far under budget
  const bonus = Math.max(0, Math.floor((budget - spent) / 10));
  return base + bonus;
}
