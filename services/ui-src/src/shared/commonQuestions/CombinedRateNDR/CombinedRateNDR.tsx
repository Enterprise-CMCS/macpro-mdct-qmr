import * as CUI from "@chakra-ui/react";
import * as json from "./combinedRates.json";

export const CombinedRateNDR = () => {
  const { data } = json;
  const chipData = data.filter((item) => item.column == "CHIP")[0].rates;
  const medicaidData = data.filter((item) => item.column == "Medicaid")[0]
    .rates;
  const combinedRatesData = data.filter(
    (item) => item.column == "Combined Rate"
  )[0].rates;

  let medicaidKeys = Object.keys(medicaidData);
  let chipKeys = Object.keys(chipData);
  let combinedRatesKeys = Object.keys(combinedRatesData);

  let medicaidDataArr = new Array();
  for (let i = 0; i < medicaidKeys.length; i++) {
    for (let j = 0; j < medicaidData[medicaidKeys[i]].length; j++) {
      medicaidDataArr.push(medicaidData[medicaidKeys[i]][j]);
    }
  }

  let chipDataArr = new Array();
  for (let i = 0; i < medicaidKeys.length; i++) {
    for (let j = 0; j < chipData[chipKeys[i]].length; j++) {
      chipDataArr.push(chipData[chipKeys[i]][j]);
    }
  }

  return (
    <span>
      {combinedRatesKeys.map((id) => {
        return (
          <CUI.Box as={"section"}>
            <CUI.Heading fontSize="xl" mt="2" mb="2">
              {combinedRatesData[id].category} - {combinedRatesData[id].label}
            </CUI.Heading>
            <CUI.Table variant="simple" mt="4" size="md" verticalAlign="top">
              <CUI.Thead>
                <CUI.Tr>
                  <CUI.Th></CUI.Th>
                  <CUI.Th>Medicaid</CUI.Th>
                  <CUI.Th>CHIP</CUI.Th>
                  <CUI.Th>Combined Rate</CUI.Th>
                </CUI.Tr>
              </CUI.Thead>
              <CUI.Tbody>
                <CUI.Tr>
                  <CUI.Td>Numerator</CUI.Td>
                  <CUI.Td isNumeric> {medicaidDataArr[id].numerator}</CUI.Td>
                  <CUI.Td isNumeric>{chipDataArr[id].numerator}</CUI.Td>
                </CUI.Tr>
                <CUI.Tr>
                  <CUI.Td>Denominator</CUI.Td>
                  <CUI.Td isNumeric>{medicaidDataArr[id].denominator}</CUI.Td>
                  <CUI.Td isNumeric>{chipDataArr[id].denominator}</CUI.Td>
                </CUI.Tr>
                <CUI.Tr>
                  <CUI.Td>Rate</CUI.Td>
                  <CUI.Td isNumeric>{medicaidDataArr[id].rate}</CUI.Td>
                  <CUI.Td isNumeric>{chipDataArr[id].rate}</CUI.Td>
                  <CUI.Td isNumeric>{combinedRatesData[id].rate}</CUI.Td>
                </CUI.Tr>
              </CUI.Tbody>
            </CUI.Table>
          </CUI.Box>
        );
      })}
    </span>
  );
};
