import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { Link } from "react-router-dom";

enum coreSetType {
  ACS = "Adult",
  CCS = "Child",
  CCSM = "Child - Medicaid",
  CCSC = "Child - CHIP",
  HHCS = "Health Home",
}

enum coreSetMeasureTitle {
  ACS = "Adult Core Set Measure",
  CCS = "Child Core Set Measure",
  CCSM = "Child Core Set Measure: Medicaid",
  CCSC = "Child Core Set Measure: CHIP",
  HHCS = "Health Home Core Set Measure: User generated SPA name",
}

enum coreSetQuestionsText {
  ACS = "Adult Core Set Questions",
  CCS = "Child Core Set Questions",
  CCSM = "Child Core Set Questions: Medicaid",
  CCSC = "Child Core Set Questions: CHIP",
  HHCS = "Health Home Core Set Questions: User generated SPA name",
}

export const CoreSet = () => {
  const { state, year, coreSetId } = useParams<Params>();

  // This is where a fetch for the measures would live and calculate progress completed
  const measures = [
    {
      Type: "Adult",
      title: "Antidepressant Medication Management",
      abbr: "AMM-AD",
      path: "",
      isReporting: false,
      rateComplete: 0,
      lastDateModified: "",
      id: "",
      actions: [
        {
          itemText: "Edit",
          id: "1",
          handleSelect: (id: string) => console.log(id),
        },
      ],
    },
    {
      Type: "Health Home",
      title: "Ambulatory Care: Emergency Department (ED) Visits",
      abbr: "AMB-HH",
      path: "",
      isReporting: false,
      rateComplete: 0,
      lastDateModified: "",
      id: "",
      actions: [
        {
          itemText: "Edit",
          id: "1",
          handleSelect: (id: string) => console.log(id),
        },
      ],
    },
  ];

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${coreSetId}`,
          name: coreSetMeasureTitle[
            coreSetId as keyof typeof coreSetMeasureTitle
          ],
        },
      ]}
    >
      <CUI.Flex>
        <CUI.HStack
          justifyContent="space-between"
          flex="8"
          borderRadius="8"
          backgroundColor="gray.100"
          p="4"
        >
          <CUI.Box>
            <CUI.Text fontSize="sm">Core Set Qualifiers</CUI.Text>
            <Link to={"questions"}>
              <CUI.Text fontSize="sm" color="blue">
                {
                  coreSetQuestionsText[
                    coreSetId as keyof typeof coreSetQuestionsText
                  ]
                }
              </CUI.Text>
            </Link>
          </CUI.Box>

          <CUI.HStack>
            <CUI.Box pr="10">
              <CUI.Text fontSize="sm">
                {`${
                  coreSetType[coreSetId as keyof typeof coreSetType]
                } Measures`}
              </CUI.Text>
              <CUI.Text fontSize="sm" fontWeight="600">
                16% Complete
              </CUI.Text>
            </CUI.Box>
            <QMR.ProgressCircle
              circularProgressProps={{ color: "green", size: "4.5rem" }}
              circularProgressLabelProps={{ fontSize: ".8rem" }}
              currentProgress={2}
              maxValue={measures.length}
            />
          </CUI.HStack>
        </CUI.HStack>
        <CUI.Spacer />
        <CUI.Box flex="1" textAlign="center" alignSelf="center">
          <QMR.ContainedButton
            buttonProps={{
              colorScheme: "blue",
            }}
            buttonText="Submit Measures"
            helperText={`Complete all ${
              coreSetType[coreSetId as keyof typeof coreSetType]
            } Core Set Questions and ${
              coreSetType[coreSetId as keyof typeof coreSetType]
            } Core Set Measures to submit FFY 2021`}
            helperTextProps={{
              fontSize: ".5rem",
              paddingTop: "1",
            }}
          />
        </CUI.Box>
      </CUI.Flex>
      <CUI.Box mt="15" maxH="md" overflowY="auto">
        <QMR.Table data={measures} columns={QMR.measuresColumns} />
      </CUI.Box>
    </QMR.StateLayout>
  );
};
