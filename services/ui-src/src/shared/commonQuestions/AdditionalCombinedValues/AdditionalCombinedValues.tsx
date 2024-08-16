import * as CUI from "@chakra-ui/react";
import { CombinedRatesPayload } from "../CombinedRateNDR/CombinedRateTypes";

type Props = {
  payload: CombinedRatesPayload;
};

const programDisplayNames = {
  Medicaid: "Medicaid",
  CHIP: "Separate CHIP",
  Combined: "Combined Count",
} as const;

const verticalValueTable = (tables: CombinedRatesPayload["AdditionalValues"]) => {
  return (
    <CUI.VStack align="flex-start" mt="4">
      {(["Medicaid", "CHIP", "Combined"] as const).map((programType, ptIndex) => (
        <CUI.List
          key={ptIndex}
          padding="0 0 1rem 2rem"
          textTransform="capitalize"
        >
          <CUI.Text fontWeight="bold" mb="2">
            {programDisplayNames[programType]}
          </CUI.Text>
          {tables.map((table, rIndex) => (
            <CUI.ListItem key={rIndex} pl="7">
              {table.label}: {table[programType]}
            </CUI.ListItem>
          ))}
        </CUI.List>
      ))}
      <CUI.Divider borderColor="gray.300" />
    </CUI.VStack>
  );
};

const horizontalValueTable = (tables: CombinedRatesPayload["AdditionalValues"]) => {
  return (
    <CUI.Table variant="unstyled" mt="4" size="md" verticalAlign="top">
      <CUI.Thead>
        <CUI.Tr>
          <CUI.Td></CUI.Td>
          {(["Medicaid", "CHIP", "Combined"] as const).map((programType, index) => (
            <CUI.Th key={index} sx={sx.header}>
              {programDisplayNames[programType]}
            </CUI.Th>
          ))}
        </CUI.Tr>
      </CUI.Thead>
      <CUI.Tbody>
        {tables.map((table, tIndex) => (
          <CUI.Tr sx={sx.row} key={tIndex}>
            <CUI.Th sx={sx.verticalHeader} scope="row">
              {table.label}
            </CUI.Th>
            {(["Medicaid", "CHIP", "Combined"] as const).map((programType, ptIndex) => (
              <CUI.Td key={ptIndex} isNumeric sx={sx.content}>
                {table[programType]}
              </CUI.Td>
            ))}
          </CUI.Tr>
        ))}
      </CUI.Tbody>
    </CUI.Table>
  );
};

export const AdditionalCombinedValues = ({
  payload: { AdditionalValues },
}: Props) => {
  provideDefaultValues(AdditionalValues);

  return (
    <CUI.Box sx={sx.tableContainer} mb="3rem">
      {AdditionalValues.length > 0 && (
        <CUI.Box mt="12" as={"section"}>
          <CUI.Hide below="md">{horizontalValueTable(AdditionalValues)}</CUI.Hide>
          <CUI.Show below="md">{verticalValueTable(AdditionalValues)}</CUI.Show>
        </CUI.Box>
      )}
    </CUI.Box>
  );
};

/**
 * Fill in strings such as `"-"` and `"Not reported"` for any undefined values.
 */
const provideDefaultValues = (
  // TODO something better here
  tables: any//CombinedRatesPayload["AdditionalValues"]
) => {
  for (let table of tables) {
    table.Medicaid ??= "Not Reported";
    table.CHIP ??= "Not Reported";
    table.Combined ??= "";
  }
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
    letterSpacing: "normal",
  },
  verticalHeader: {
    fontWeight: "semibold",
    "text-transform": "capitalize",
    fontSize: "16px",
    color: "black",
    letterSpacing: "normal",
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
