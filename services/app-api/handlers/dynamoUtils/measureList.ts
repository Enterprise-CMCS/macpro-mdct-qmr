import type { MeasureMetaData } from "../../types";
import { measureList2021 } from "./measureList2021";
import { measureList2022 } from "./measureList2022";
import { measureList2023 } from "./measureList2023";
import { measureList2024 } from "./measureList2024";
import { measureList2025 } from "./measureList2025";
import { measureList2026 } from "./measureList2026";

interface Measure {
  [year: number]: MeasureMetaData[];
}

export const measures: Measure = {
  2021: measureList2021,
  2022: measureList2022,
  2023: measureList2023,
  2024: measureList2024,
  2025: measureList2025,
  2026: measureList2026,
};
