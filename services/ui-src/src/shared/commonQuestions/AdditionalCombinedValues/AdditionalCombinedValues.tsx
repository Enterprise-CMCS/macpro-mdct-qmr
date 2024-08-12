import * as CUI from "@chakra-ui/react";
import { CombinedRatesPayload } from "../CombinedRateNDR/CombinedRateTypes";

type Props = {
  payload: CombinedRatesPayload;
};

const programDisplayNames = {
  Medicaid: "Medicaid",
  CHIP: "Separate CHIP",
  Combined: "Combined Rate",
} as const;

const verticalValueTable = (tables: TableDataShape[]) => {
  return (
    <CUI.VStack align="flex-start" mt="4">
      {(["Medicaid", "CHIP"] as const).map((programType, ptIndex) => (
        <CUI.List
          key={ptIndex}
          padding="0 0 1rem 2rem"
          textTransform="capitalize"
        >
          <CUI.Text fontWeight="bold" mb="2">
            {programType === "Combined" ? "Combined Count" : programDisplayNames[programType]}
          </CUI.Text>
          {tables.map((table, rIndex) => (
            <CUI.ListItem key={rIndex} pl="7">
              {table.label}: {table[programType].value}
            </CUI.ListItem>
          ))}
        </CUI.List>
      ))}
      <CUI.Divider borderColor="gray.300" />
    </CUI.VStack>
  );
};

const horizontalValueTable = (tables: any[]) => {
  return (
    <CUI.Table variant="unstyled" mt="4" size="md" verticalAlign="top">
      <CUI.Thead>
        <CUI.Tr>
          <CUI.Td></CUI.Td>
          {programTypes.map((programTypes, index) => (
            <CUI.Th key={index} sx={sx.header}>
              {programTypes === "Combined Rate"
                ? "Combined Count"
                : programTypes}
            </CUI.Th>
          ))}
        </CUI.Tr>
      </CUI.Thead>
      <CUI.Tbody>
        {tables.map((table) => (
          <CUI.Tr sx={sx.row}>
            <CUI.Th sx={sx.verticalHeader} scope="row">
              {table.label}
            </CUI.Th>
            {programTypes.map((programType, ptIndex) => (
              <CUI.Td key={ptIndex} isNumeric sx={sx.content}>
                {table[programType].value}
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
          <CUI.Hide below="md">{horizontalValueTable(valueTables)}</CUI.Hide>
          <CUI.Show below="md">{verticalValueTable(valueTables)}</CUI.Show>
        </CUI.Box>
      )}
    </CUI.Box>
  );
};

/**
 * Fill in strings such as `"-"` and `"Not reported"` for any undefined values.
 */
// Syntax note: it is possible to make custom assertions with arrow functions, but the syntax is surprisingly odd,
// so it is less confusing to use a standard function declaration here.
// Usage note: Normally assertion functions throw errors when an object isn't of the asserted type,
// but it is also valid to coerce it into that type instead, as we do here.
const provideDefaultValues = (
  tables: CombinedRatesPayload["AdditionalValues"]
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
