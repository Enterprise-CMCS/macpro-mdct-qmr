import { OmsNode } from "./TypeOptionalMeasureStratification";
import { PerformanceMeasureData } from "./TypePerformanceMeasure";

export namespace DataDrivenTypes {
  export type OptionalMeasureStrat = OmsNode[];
  export type SingleOmsNode = OmsNode;
  export type PerformanceMeasure = PerformanceMeasureData;
}
