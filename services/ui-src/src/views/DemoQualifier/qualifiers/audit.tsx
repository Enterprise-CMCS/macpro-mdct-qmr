import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./";
import { ICheckbox } from "components/MultiSelect";
import { useMemo, useState } from "react";

// import { useFormContext } from "react-hook-form";

export const Audit = () => {
  const multiSelectList = useMemo<ICheckbox[]>(
    () => [
      {
        label: "AMM-AD - Antidepressant Medication Management",
        value: "AMM-AD",
        isVisible: true,
      },
      {
        label: "AMR-AD - Asthma Medication Ratio: Ages 19 to 64",
        value: "AMR-AD",
        isVisible: true,
      },
      {
        label: "BCS-AD - Breast Cancer Screening",
        value: "BCS-AD",
        isVisible: true,
      },
      {
        label: "CBP-AD - Controlling High Blood Pressue",
        value: "CBP-AD",
        isVisible: true,
      },
      {
        label: "CCP-AD - Contraceptive Care Postpartum Women Ages 21 - 44",
        value: "CCP-AD",
        isVisible: true,
      },
    ],
    []
  );
  const [measureList, setMeasureList] = useState<string[]>([""]);

  return (
    <>
      <Q.QualifierHeader
        header="2. Audit or Validation of Measures"
        description="Were any of the Core Set meaures audited or validated?"
      />
      <CUI.Spacer />
      <CUI.Stack>
        <CUI.Box pl="5" my="5">
          <QMR.RadioButton
            formLabelProps={{ fontWeight: "600" }}
            name="isAudited"
            options={[
              {
                displayValue:
                  "Yes, some of the Core Set measures have been audited or validated",
                value: "some",
                children: [
                  <CUI.Stack mb="5">
                    {measureList.map((m: any, index: number) => {
                      console.log(m);
                      return (
                        <CUI.Box
                          border="1px"
                          borderColor="gray.200"
                          borderRadius="md"
                          p="5"
                          mb="5"
                        >
                          <QMR.TextInput
                            formLabelProps={{ fontWeight: "400" }}
                            label="Who conducted the audit or validation?"
                            name={`whoAudited.${index}`}
                            formControlProps={{ mb: "5" }}
                          />
                          <CUI.Text>
                            Which measures did they audit or validate?
                          </CUI.Text>
                          <QMR.MultiSelect
                            multiSelectList={multiSelectList}
                            name={`audit.${index}`}
                          />
                          <CUI.Spacer />
                        </CUI.Box>
                      );
                    })}
                  </CUI.Stack>,
                  <QMR.ContainedButton
                    buttonText={"+ Add Another"}
                    buttonProps={{
                      variant: "outline",
                      colorScheme: "blue",
                      textTransform: "capitalize",
                    }}
                    onClick={() => {
                      setMeasureList([...measureList, ""]);
                    }}
                  />,
                ],
              },
              {
                displayValue:
                  "No, none of the Core Set measures have been audited or validated",
                value: "none",
              },
            ]}
          />
        </CUI.Box>
      </CUI.Stack>
    </>
  );
};
