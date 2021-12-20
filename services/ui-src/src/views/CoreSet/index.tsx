import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams } from "react-router-dom";
import { Params } from "Routes";

enum coresetType {
  ACS = "Adult",
  CCS = "Child",
  HHCS = "Health Home",
}

export const CoreSet = () => {
  const { state, year, coreset } = useParams<Params>();
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${coreset}`,
          name: `${
            coresetType[coreset as keyof typeof coresetType]
          } Core Set Measures`,
        },
      ]}
    >
      <CUI.HStack>
        <CUI.HStack
          minW="5xl"
          borderRadius="8"
          backgroundColor="gray.100"
          p="4"
          mr="20"
        >
          <CUI.Box minW="3xl">
            <CUI.Text>Core Set Qualifiers</CUI.Text>
            <CUI.Text color="blue">Adult Core Set Questions</CUI.Text>
          </CUI.Box>
          <CUI.Box pr="10">
            <CUI.Text>Adult Measures</CUI.Text>
            <CUI.Text fontWeight="600">16% Complete</CUI.Text>
          </CUI.Box>
          <QMR.ProgressCircle
            circularProgressProps={{ color: "green" }}
            currentProgress={2}
            maxValue={32}
          />
        </CUI.HStack>

        <CUI.Box textAlign="center" justifySelf="end">
          <QMR.ContainedButton
            buttonProps={{
              colorScheme: "blue",
              w: "full",
            }}
            buttonText="Submit Measures"
            helperText="Complete all Adult Core Set Questions andAdult Core Set Measures to submit FFY 2021"
            helperTextProps={{ fontSize: ".7rem", color: "grey" }}
          />
        </CUI.Box>
      </CUI.HStack>
      <CUI.Box mt="3" maxH="md" overflowY="auto">
        <QMR.Table data={QMR.adultMeasuresData} columns={QMR.measuresColumns} />
      </CUI.Box>
    </QMR.StateLayout>
  );
};
