import * as CUI from "@chakra-ui/react";
import { json, RateCategoryMap, RateDataShape } from "./combinedRatesNDR";

export const CombinedRateNDR = () => {
  const { data } = json;

  // filter data by Medicaid, CHIP, and Combined Rates
  const medicaidData = data.find((item) => item.column == "Medicaid")?.rates as RateCategoryMap;
  const chipData = data.find((item) => item.column == "CHIP")?.rates as RateCategoryMap;
  const combinedRatesData = data.find(
    (item) => item.column == "Combined Rate"
  )?.rates as RateDataShape[];

  let combinedRatesKeys = combinedRatesData.map((_, index) => index);

  // restructure Medicaid & CHIP data into 1d array for easier traversal
  let medicaidDataArr = Object.values(medicaidData).flat();
  let chipDataArr = Object.values(chipData).flat();

  return (
    <CUI.Box>
      {combinedRatesKeys.map((id) => {
        return (
          <CUI.Box as={"section"}>
            <CUI.Heading fontSize="xl" mt="12" mb="2">
              {combinedRatesData[id].category} - {combinedRatesData[id].label}
            </CUI.Heading>
            <CUI.Table variant="unstyled" mt="4" size="md" verticalAlign="top">
              <CUI.Thead>
                <CUI.Tr>
                  <CUI.Th></CUI.Th>
                  <CUI.Th sx={sx.header}>Medicaid</CUI.Th>
                  <CUI.Th sx={sx.header}>CHIP</CUI.Th>
                  <CUI.Th sx={sx.header}>Combined Rate</CUI.Th>
                </CUI.Tr>
              </CUI.Thead>
              <CUI.Tbody>
                <CUI.Tr sx={sx.row}>
                  <CUI.Td sx={sx.verticalHeader}>Numerator</CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {medicaidDataArr[id].numerator
                      ? medicaidDataArr[id].numerator
                      : "Not answered"}
                  </CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {chipDataArr[id].numerator
                      ? chipDataArr[id].numerator
                      : "Not answered"}
                  </CUI.Td>
                </CUI.Tr>
                <CUI.Tr sx={sx.row}>
                  <CUI.Td sx={sx.verticalHeader}>Denominator</CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {medicaidDataArr[id].denominator
                      ? medicaidDataArr[id].denominator
                      : "Not answered"}
                  </CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {chipDataArr[id].denominator
                      ? chipDataArr[id].denominator
                      : "Not answered"}
                  </CUI.Td>
                </CUI.Tr>
                <CUI.Tr sx={sx.row}>
                  <CUI.Td sx={sx.verticalHeader}>Rate</CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {medicaidDataArr[id].rate}
                  </CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {chipDataArr[id].rate}
                  </CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {combinedRatesData[id].rate}
                  </CUI.Td>
                </CUI.Tr>
              </CUI.Tbody>
            </CUI.Table>
          </CUI.Box>
        );
      })}
    </CUI.Box>
  );
};

const sx = {
  header: {
    fontSize: "md",
    textAlign: "right",
    "text-transform": "capitalize",
  },
  verticalHeader: {
    fontWeight: "semibold",
  },
  content: {
    textAlign: "right",
    paddingleft: "0px",
  },
  row: { borderBottom: "0.1px solid gray" },
};
