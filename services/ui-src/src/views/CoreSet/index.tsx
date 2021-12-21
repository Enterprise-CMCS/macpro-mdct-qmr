import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { Link } from "react-router-dom";

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
                Adult Core Set Questions
              </CUI.Text>
            </Link>
          </CUI.Box>

          <CUI.HStack>
            <CUI.Box pr="10">
              <CUI.Text fontSize="sm">Adult Measures</CUI.Text>
              <CUI.Text fontSize="sm" fontWeight="600">
                16% Complete
              </CUI.Text>
            </CUI.Box>
            <QMR.ProgressCircle
              circularProgressProps={{ color: "green", size: "4.5rem" }}
              currentProgress={2}
              maxValue={32}
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
            helperText="Complete all Adult Core Set Questions and Adult Core Set Measures to submit FFY 2021"
            helperTextProps={{
              fontSize: ".5rem",
              color: "grey",
              paddingTop: "1",
            }}
          />
        </CUI.Box>
      </CUI.Flex>
      <CUI.Box mt="3" maxH="md" overflowY="auto">
        <QMR.Table data={QMR.adultMeasuresData} columns={QMR.measuresColumns} />
      </CUI.Box>
    </QMR.StateLayout>
  );
};
