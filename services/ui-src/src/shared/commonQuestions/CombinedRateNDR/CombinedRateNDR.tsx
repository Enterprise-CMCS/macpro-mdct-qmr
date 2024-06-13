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
    <CUI.Box sx={sx.tableContainer}>
      {combinedRatesKeys.map((id) => {
        return (
          <CUI.Box as={"section"}>
            <CUI.Heading fontSize="xl" mt="12" mb="2">
              {combinedRatesData[id].category} - {combinedRatesData[id].label}
            </CUI.Heading>
            <CUI.Table variant="unstyled" mt="4" size="md" verticalAlign="top">
              <CUI.Thead>
                <CUI.Tr>
                  <CUI.Td></CUI.Td>
                  <CUI.Th sx={sx.header}>Medicaid</CUI.Th>
                  <CUI.Th sx={sx.header}>CHIP</CUI.Th>
                  <CUI.Th sx={sx.header}>Combined Rate</CUI.Th>
                </CUI.Tr>
              </CUI.Thead>
              <CUI.Tbody>
                <CUI.Tr sx={sx.row}>
                  <CUI.Th sx={sx.verticalHeader} scope="row">Numerator</CUI.Th>
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
                  <CUI.Th sx={sx.verticalHeader} scope="row">Denominator</CUI.Th>
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
                  <CUI.Th sx={sx.verticalHeader} scope="row">Rate</CUI.Th>
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
  tableContainer: {
    maxWidth: "718px",
  },
  header: {
    textAlign: "right",
    "text-transform": "capitalize",
    fontSize: "16px",
    color: "black",
  },
  verticalHeader: {
    fontWeight: "semibold",
    "text-transform": "capitalize",
    fontSize: "16px",
    color: "black",
  },
  content: {
    textAlign: "right",
    paddingleft: "0px",
    "&:nth-child(4)": {
      fontWeight: "bold",
    },
  },
  row: { borderBottom: "0.1px solid #D6D7D9" },
};
