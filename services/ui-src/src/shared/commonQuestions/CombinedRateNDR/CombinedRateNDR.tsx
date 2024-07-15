import * as CUI from "@chakra-ui/react";
import {
  CombinedRatePayload,
  RateCategoryMap,
  RateDataShape,
} from "./CombinedRateTypes";
import * as Labels from "labels/RateTextLabels";

const programTypes = ["Medicaid", "Separate CHIP", "Combined Rate"] as const;
const rateComponents = ["numerator", "denominator", "rate"] as const;
type ProgramType = typeof programTypes[number];

const verticalTable = (table: any) => {
  return (
    <CUI.VStack align="flex-start" mt="4">
      {programTypes.slice(0, -1).map((programType, ptIndex) => (
        <CUI.List key={ptIndex} padding="0 0 1rem 2rem" textTransform="capitalize">
          <CUI.Text fontWeight="bold" mb="2">
            {programType}
          </CUI.Text>
          {rateComponents.map((rateComponent, rIndex) => (
            <CUI.ListItem key={rIndex} pl="7">
              {rateComponent}: {table[programType]?.[rateComponent.toLowerCase()]}
            </CUI.ListItem>
          ))}
        </CUI.List>
      ))}
      <CUI.List padding="0 0 1rem 2rem">
        <CUI.Text fontWeight="bold" mb="2">
          {programTypes[2]}: {table["Combined Rate"]?.rate}
        </CUI.Text>
      </CUI.List>
      <CUI.Divider borderColor="gray.300" />
    </CUI.VStack>
  );
};

const horizontalTable = (table: TableDataShape) => {
  return (
    <CUI.Table variant="unstyled" mt="4" size="md" verticalAlign="top">
      <CUI.Thead>
        <CUI.Tr>
          <CUI.Td></CUI.Td>
          {programTypes.map((programTypes, index) => (
            <CUI.Th key={index} sx={sx.header}>{programTypes}</CUI.Th>
          ))}
        </CUI.Tr>
      </CUI.Thead>
      <CUI.Tbody>
        {rateComponents.map((rateComponent, rIndex) => (
          <CUI.Tr key={rIndex} sx={sx.row}>
            <CUI.Th sx={sx.verticalHeader} scope="row">
              {rateComponent}
            </CUI.Th>
            {programTypes.map((programType, ptIndex) => (
              <CUI.Td key={ptIndex} isNumeric sx={sx.content}>
                {table[programType]?.[rateComponent]}
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
  provideDefaultValues(tables);
  sortRates(tables, json.year, json.measure);

  return (
    <CUI.Box sx={sx.tableContainer} mb="3rem">
      {tables.map((table, index) => {
        return (
          <CUI.Box key={index} as={"section"}>
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
              {horizontalTable(table)}
            </CUI.Hide>
            <CUI.Show below="md">
              {verticalTable(table)}
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
  "Separate CHIP"?: RateDataShape;
  Medicaid?: RateDataShape;
  "Combined Rate"?: RateDataShape;
};

const collectRatesForDisplay = (
  json: CombinedRatePayload
): TableDataShape[] => {
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
    rememberRate(chipRate, "Separate CHIP");
  }
  for (let combinedRate of combinedRatesData) {
    rememberRate(combinedRate, "Combined Rate");
  }
  return tables;
};

/**
 * Fill in strings such as `"-"` and `"Not reported"` for any undefined values.
 */
const provideDefaultValues = (tables: TableDataShape[]) => {
  tables?.forEach((table) => {
    programTypes.forEach((header) => {
      const notAnswered = header === "Combined Rate" ? "" : "Not reported";
      //setting values to not answered if key doesn't exist
      const numerator = table[header]?.numerator ?? notAnswered;
      const denominator = table[header]?.denominator ?? notAnswered;
      const rate = table[header]?.rate ?? "-";
      //add value back to table object
      table[header] = { ...table[header]!, numerator, denominator, rate };
    });
  });
};

/**
 * Sort the rates in-place, to match how they are displayed on individual measure pages
 */
const sortRates = (tables: TableDataShape[], year: string, measure: string) => {
  //dynamically pull the rateLabelText by combined rates year so that we can get the cat and qual info of the measure
  const rateTextLabel = Labels[`RateLabel${year}` as keyof typeof Labels];
  const { categories, qualifiers } = rateTextLabel!.getCatQualLabels(
    measure! as keyof typeof rateTextLabel.data
  );
  //build an array of uids in the order they are displayed in the pm section
  const sortList = categories
    .map((cat) => [...qualifiers.map((qual) => `${cat.id}.${qual.id}`)])
    .flat();
  tables.sort((a, b) => sortList.indexOf(a.uid) - sortList.indexOf(b.uid));
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
