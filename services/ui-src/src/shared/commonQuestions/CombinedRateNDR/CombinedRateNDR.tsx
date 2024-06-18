import * as CUI from "@chakra-ui/react";
import {
  CombinedRatePayload,
  RateCategoryMap,
  RateDataShape,
} from "./CombinedRateTypes";

export const CombinedRateNDR = ({ json }: Props) => {
  const tables = collectRatesForDisplay(json);

  return (
    <CUI.Box sx={sx.tableContainer} mb="3rem">
      {tables.map((table) => {
        return (
          <CUI.Box as={"section"}>
            {table.category ? (
              <CUI.Heading fontSize="xl" mt="12" mb="2">
                {table.category} - {table.label}
              </CUI.Heading>
            ) : (
              <CUI.Heading fontSize="xl" mt="12" mb="2">
                {table.label}
              </CUI.Heading>
            )}
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
                  <CUI.Th sx={sx.verticalHeader} scope="row">
                    Numerator
                  </CUI.Th>
                  <CUI.Td isNumeric sx={sx.content}>
                    {table.Medicaid?.numerator
                      ? table.Medicaid.numerator
                      : "Not answered"}
                  </CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {table.CHIP?.numerator
                      ? table.CHIP.numerator
                      : "Not answered"}
                  </CUI.Td>
                </CUI.Tr>
                <CUI.Tr sx={sx.row}>
                  <CUI.Th sx={sx.verticalHeader} scope="row">
                    Denominator
                  </CUI.Th>
                  <CUI.Td isNumeric sx={sx.content}>
                    {table.Medicaid?.denominator
                      ? table.Medicaid.denominator
                      : "Not answered"}
                  </CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {table.CHIP?.denominator
                      ? table.CHIP.denominator
                      : "Not answered"}
                  </CUI.Td>
                </CUI.Tr>
                <CUI.Tr sx={sx.row}>
                  <CUI.Th sx={sx.verticalHeader} scope="row">
                    Rate
                  </CUI.Th>
                  <CUI.Td isNumeric sx={sx.content}>
                    {table.Medicaid?.rate ? table.Medicaid.rate : "-"}
                  </CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {table.CHIP?.rate ? table.CHIP.rate : "-"}
                  </CUI.Td>
                  <CUI.Td isNumeric sx={sx.content}>
                    {table["Combined Rate"]?.rate
                      ? table["Combined Rate"].rate
                      : "-"}
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

type TableDataShape = {
  uid: string;
  label: string;
  category?: string;
  CHIP?: RateDataShape;
  Medicaid?: RateDataShape;
  "Combined Rate"?: RateDataShape;
};

const collectRatesForDisplay = (
  json: CombinedRatePayload | undefined
): TableDataShape[] => {
  if (!json) {
    return [];
  }
  const tables: TableDataShape[] = [];
  const data = json.data;

  // filter data by Medicaid, CHIP, and Combined Rates
  const medicaidData = (data?.find((item) => item.column == "Medicaid")
    ?.rates ?? {}) as RateCategoryMap;
  const chipData = (data?.find((item) => item.column == "CHIP")?.rates ??
    {}) as RateCategoryMap;
  const combinedRatesData = (data?.find(
    (item) => item.column == "Combined Rate"
  )?.rates ?? []) as RateDataShape[];

  const rememberRate = (
    rate: RateDataShape,
    program: "CHIP" | "Medicaid" | "Combined Rate"
  ) => {
    let existingTable = tables.find((t) => t.uid === rate.uid);
    if (existingTable) {
      existingTable[program] = rate;
    } else {
      tables.push({
        uid: rate.uid,
        category: rate.category,
        label: rate.label,
        [program]: rate,
      });
    }
  };
  for (let medicaidRate of Object.values(medicaidData).flat()) {
    rememberRate(medicaidRate, "Medicaid");
  }
  for (let chipRate of Object.values(chipData).flat()) {
    rememberRate(chipRate, "CHIP");
  }
  for (let combinedRate of combinedRatesData) {
    rememberRate(combinedRate, "Combined Rate");
  }
  return tables;
};

type Props = {
  json: CombinedRatePayload;
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
