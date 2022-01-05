import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./";

export const ExternalContractor = () => {
  return (
    <>
      <Q.QualifierHeader
        header="3. External Contractor"
        description="Please indicate whether your state obtained assistance from one or
        more external contractors in collecting, calculating and/or reporting
        Core Set data (optional)."
      />
      <CUI.Spacer />
      <CUI.Stack>
        <CUI.Box pl="5" my="5">
          <QMR.RadioButton
            formLabelProps={{ fontWeight: "600" }}
            label=""
            name="hasExternalContractor"
            options={[
              {
                displayValue:
                  "Yes, we did obtained assistance from one or more external contractors in collecting, calculating and/or reporting Core Set data.",
                value: "yes",
                children: [
                  <QMR.Checkbox
                    name="contractorType"
                    options={[
                      {
                        displayValue:
                          "External Quality Review Organization (EQRO)",
                        value: "EQRO",
                      },
                      {
                        displayValue: "MMIS Contractor",
                        value: "MMIS",
                      },
                      {
                        displayValue: "Data Analytics Contractor",
                        value: "dataAnalytics",
                      },
                      {
                        displayValue: "Other",
                        value: "Other",
                        children: [
                          <QMR.TextArea
                            label="Explain the Data inconsistencies/Accuracy issues:"
                            name="otherContractorDetails"
                          />,
                        ],
                      },
                    ]}
                  />,
                ],
              },
              {
                displayValue: "No, we calculated all the measure internally.",
                value: "no",
              },
            ]}
          />
        </CUI.Box>
      </CUI.Stack>
    </>
  );
};
