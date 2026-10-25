import { describe, expect, it } from "vitest";
import { aggregateWithSuppression } from "../src/domain/engine.js";
describe("cohort aggregation", () => {
  it("suppresses small groups and returns aggregates for larger groups", () => { const rows=[{cohort:"A",measure:2},{cohort:"A",measure:4},{cohort:"B",measure:1},{cohort:"B",measure:3},{cohort:"B",measure:5}]; const result=aggregateWithSuppression(rows,3); expect(result.suppressedCells).toBe(1); expect(result.cells).toEqual([{cohort:"B",count:3,mean:3}]); });
  it("rejects invalid thresholds", () => { expect(()=>aggregateWithSuppression([],1)).toThrow(RangeError); });
});