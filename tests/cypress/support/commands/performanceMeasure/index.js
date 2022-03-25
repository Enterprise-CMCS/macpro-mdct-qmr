Cypress.Commands.add(
  "fillInAllPerformanceMeasureRates",
  ({ qualifiers, categories, defaultAllValue = 2, values, incrementing }) => {
    const fillArray = values ?? [
      [defaultAllValue, defaultAllValue, defaultAllValue],
    ];
  }
);
