import * as DC from "dataConstants";

type YesNo = typeof DC.YES | typeof DC.NO;

type MonthYear = {
  [DC.SELECTED_MONTH]: number;
  [DC.SELECTED_YEAR]: number;
};

export interface DateRange {
  [DC.DATE_RANGE]: {
    [DC.END_DATE]: MonthYear;
    [DC.START_DATE]: MonthYear;
  };
  [DC.MEASUREMENT_PERIOD_CORE_SET]?: YesNo; // if state adhered to Core Set specifications in defining the measurement period for calculating measure
}
