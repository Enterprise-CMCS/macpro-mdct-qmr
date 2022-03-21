describe("OY2 9963 CPC CH", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.deleteChildCoreSets();
    cy.addCombinedChildCoreset();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CPC-CH");
  });
  it("Fill out CPC-CH and verify the page", () => {
    cy.get('[data-cy="Did you collect this measure?"]').should(
      "have.text",
      "Did you collect this measure?"
    );
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DidCollect0"]').click();
    cy.get('[data-cy="HowDidYouReport1"]').click();
    cy.get('[data-cy="HowDidYouReport-Explanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).click();
    cy.get('[data-cy="DataSource-CAHPS-Version1"]').click();
    cy.get('[data-cy="DataSource-CAHPS-Version-Other"]').click();
    cy.get(
      '[data-cy="DataSource-Included-ItemSets0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DataSource-Included-ItemSets0-checkbox").check();
    cy.get(
      '[data-cy="DataSource-Included-ItemSets1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DataSource-Included-ItemSets1-checkbox").check();
    cy.get(
      '[data-cy="DataSource-Included-ItemSets2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DataSource-Included-ItemSets2-checkbox").check();
    cy.get(
      '[data-cy="DataSource-Included-ItemSets2"] > .chakra-checkbox__control > div'
    ).click();
    cy.get("#DataSource-Included-ItemSets2-checkbox").uncheck();
    cy.get('[data-cy="DataSource-Included-ItemSets2"]').click();
    cy.get("#DataSource-Included-ItemSets2-checkbox").check();
    cy.get('[data-cy="DataSource-Included-ItemSets-Other"]').click();
    cy.get(
      "#DataSource-Admin-Protocol-AHRQ\\ CAHPS\\ administrative\\ protocol"
    ).should("have.text", "AHRQ CAHPS administrative protocol");
    cy.get('[data-cy="DataSource-Admin-Protocol2"]').click();
    cy.get('[data-cy="DataSource-Admin-Protocol-Other"]').click();
    cy.get("#DefinitionOfSurveySample-SurveySampleIncludesMedicaidOnly").should(
      "have.text",
      "Survey sample includes Medicaid (Title XIX) population only"
    );
    cy.get(
      "#DefinitionOfSurveySample-SurveySampleIncludesCHIPMedicaidCombined"
    ).should(
      "have.text",
      "Survey sample includes CHIP (Title XXI) and Medicaid (Title XIX) populations, combined"
    );
    cy.get(
      "#DefinitionOfSurveySample-SurveySamplesIncludeCHIPAndMedicaidSeparately"
    ).should(
      "have.text",
      "Two sets of survey results submitted; survey samples include CHIP and Medicaid (Title XIX) populations, separately"
    );
    cy.get('[data-cy="DefinitionOfSurveySample3"]').click();
    cy.get('[data-cy="DefinitionOfSurveySample-Changes"]').click();
    cy.get(":nth-child(8) > .css-0").should(
      "have.text",
      "This measure provides information on parents’ experiences with their child’s health care. Results summarize children’s experiences through ratings, composites, and individual question summary rates."
    );
    cy.get(".css-zke1y").should(
      "have.text",
      "The Children with Chronic Conditions Supplemental Items provides information on parents’ experience with their child’s health care for the population of children with chronic conditions."
    );
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').click();
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="The measure has been validated successfully"]').should(
      "have.text",
      "The measure has been validated successfully"
    );
    /* ==== End Cypress Studio ==== */
  });
});
