import React from "react";

enum MeasurePathLocationIndexes {
  "state" = 1,
  "year" = 2,
  "coreSet" = 3,
  "measureId" = 4,
}

export const usePathParams = () => {
  return React.useMemo(() => {
    const splitLocation = window.location.pathname.split("/");

    return {
      state: splitLocation[MeasurePathLocationIndexes.state],
      year: splitLocation[MeasurePathLocationIndexes.year],
      coreSet: splitLocation[MeasurePathLocationIndexes.coreSet],
      measureId: splitLocation[MeasurePathLocationIndexes.measureId],
    };
  }, [window.location.pathname]);
};
