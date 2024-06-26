import * as CUI from "@chakra-ui/react";
import {
  CombinedRatePayload,
  RateCategoryMap,
  RateDataShape,
} from "./CombinedRateTypes";

type ProgramType = "Medicaid" | "CHIP" | "Combined Rate";
type Measures = "numerator" | "denominator" | "rate";

const VerticalTable = (
  headers: ProgramType[],
  rows: Measures[],
  table: any
) => {
  return (
    <CUI.VStack align="flex-start" mt="4">
      {headers.slice(0, -1).map((header) => (
        <CUI.List padding="0 0 1rem 2rem" textTransform="capitalize">
          <CUI.Text fontWeight="bold" mb="2">
            {header}
          </CUI.Text>
          {rows.map((row) => (
            <CUI.ListItem pl="7">
              {row}: {table[header]?.[row.toLowerCase()]}
            </CUI.ListItem>
          ))}
        </CUI.List>
      ))}
      <CUI.List padding="0 0 1rem 2rem">
        <CUI.Text fontWeight="bold" mb="2">
          {headers[2]}: {table["Combined Rate"]?.rate}
        </CUI.Text>
      </CUI.List>
      <CUI.Divider borderColor="gray.300" />
    </CUI.VStack>
  );
};

const HorizontalTable = (
  headers: ProgramType[],
  rows: Measures[],
  table: TableDataShape
) => {
  return (
    <CUI.Table variant="unstyled" mt="4" size="md" verticalAlign="top">
      <CUI.Thead>
        <CUI.Tr>
          <CUI.Td></CUI.Td>
          {headers.map((header) => (
            <CUI.Th sx={sx.header}>{header}</CUI.Th>
          ))}
        </CUI.Tr>
      </CUI.Thead>
      <CUI.Tbody>
        {rows.map((row) => (
          <CUI.Tr sx={sx.row}>
            <CUI.Th sx={sx.verticalHeader} scope="row">
              {row}
            </CUI.Th>
            {headers.map((header) => (
              <CUI.Td isNumeric sx={sx.content}>
                {table[header]?.[row]}
              </CUI.Td>
            ))}
          </CUI.Tr>
        ))}
      </CUI.Tbody>
    </CUI.Table>
  );
};

export const CombinedRateNDR = ({ json }: Props) => {
  const tables = collectRatesForDisplay(json);
  const headers: ProgramType[] = ["Medicaid", "CHIP", "Combined Rate"];
  const rows: Measures[] = ["numerator", "denominator", "rate"];

  //centralize formatting of the display data so that all the renders value are consistent
  tables.forEach((table) => {
    headers.forEach((header) => {
      const notAnswered = header === "Combined Rate" ? "" : "Not answered";
      //setting values to not answered if key doesn't exist
      const numerator = table[header]?.numerator ?? notAnswered;
      const denominator = table[header]?.denominator ?? notAnswered;
      const rate = table[header]?.rate ?? "-";
      //add value back to table object
      table[header] = { ...table[header]!, numerator, denominator, rate };
    });
  });

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
            <CUI.Hide below="md">
              {HorizontalTable(headers, rows, table)}
            </CUI.Hide>
            <CUI.Show below="md">
              {VerticalTable(headers, rows, table)}
            </CUI.Show>
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

  const rememberRate = (rate: RateDataShape, program: ProgramType) => {
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
