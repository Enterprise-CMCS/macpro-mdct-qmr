declare namespace Cypress {
  interface Chainable {
    fillInAllPerformanceMeasureRates(props: {
      qualifiers: string[];
      categories: string[];
    }): Chainable<Element>;
  }
}
