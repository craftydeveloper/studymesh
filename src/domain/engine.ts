export interface Observation { cohort: string; measure: number }
export interface CohortSummary { cohort: string; count: number; mean: number }
export function aggregateWithSuppression(rows: readonly Observation[], minimumCellSize = 5): { cells: CohortSummary[]; suppressedCells: number } {
  if (!Number.isInteger(minimumCellSize) || minimumCellSize < 2) throw new RangeError("minimumCellSize must be an integer of at least 2");
  const groups = new Map<string, number[]>();
  for (const row of rows) {
    if (!Number.isFinite(row.measure)) throw new TypeError("measure must be finite");
    const values = groups.get(row.cohort) ?? []; values.push(row.measure); groups.set(row.cohort, values);
  }
  const cells: CohortSummary[] = []; let suppressedCells = 0;
  for (const [cohort, values] of [...groups.entries()].sort(([a],[b])=>a.localeCompare(b))) {
    if (values.length < minimumCellSize) { suppressedCells++; continue; }
    cells.push({cohort,count:values.length,mean:values.reduce((sum,value)=>sum+value,0)/values.length});
  }
  return {cells,suppressedCells};
}