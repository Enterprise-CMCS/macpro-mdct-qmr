import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Common from ".";

export const ExternalContractor = () => {
  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader
        header="External Contractor"
        description="Please indicate whether your state obtained assistance from one or
        more external contractors in collecting, calculating, and/or reporting
        Core Set data (optional)."
      />
      <CUI.Spacer />
      <CUI.Stack>
        <CUI.Box pl="5" my="5">
          <QMR.RadioButton
            formLabelProps={{ fontWeight: "600" }}
            label=""
            name="WasExternalContractorUsed"
            options={[
              {
                displayValue:
                  "Yes, we did obtain assistance from one or more external contractors in collecting, calculating, and/or reporting Core Set data.",
                value: "yes",
                children: [
                  <>
                    <CUI.Text>Select all that apply:</CUI.Text>
                    <QMR.Checkbox
                      name="ExternalContractorsUsed"
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
                              label="Please explain:"
                              name="OtherContractorDetails"
                            />,
                          ],
                        },
                      ]}
                    />
                  </>,
                ],
              },
              {
                displayValue: "No, we calculated all the measures internally.",
                value: "no",
              },
            ]}
          />
        </CUI.Box>
      </CUI.Stack>
    </CUI.ListItem>
  );
};
