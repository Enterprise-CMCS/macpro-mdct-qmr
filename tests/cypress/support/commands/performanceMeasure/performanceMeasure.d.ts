declare namespace Cypress {
  interface Chainable {
    /** fills all performance measure NDR sets with optional values */
    fillInAllPerformanceMeasureRates(props: {
      qualifiers: string[];
      categories: string[];
      defaultAllValue?: number;
      values?: number[][];
      incrementing?: boolean;
    }): Chainable<Element>;
  }
}
