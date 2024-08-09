import * as CUI from "@chakra-ui/react";
import { CombinedRatesPayload, WeightedRateShape } from "./CombinedRateTypes";
import * as Labels from "labels/RateLabelTexts";

type Props = {
  payload: CombinedRatesPayload;
  year: string;
  measure: string;
};

const programDisplayNames = {
  Medicaid: "Medicaid",
  CHIP: "Separate CHIP",
  Combined: "Combined Rate",
} as const;

const rateComponentDisplayNames = {
  numerator: "numerator",
  denominator: "denominator",
  rate: "rate",
  population: "measure-eligible population",
  weightedRate: "weighted rate",
} as const;

const verticalRateTable = (
  table: CombinedRatesPayload["Rates"][number],
  rateComponents: ReturnType<typeof getRateComponents>
) => {
  return (
    <CUI.VStack align="flex-start" mt="4">
      {(["Medicaid", "CHIP"] as const).map((programType, ptIndex) => (
        <CUI.List
          key={ptIndex}
          padding="0 0 1rem 2rem"
          textTransform="capitalize"
        >
          <CUI.Text fontWeight="bold" mb="2">
            {programDisplayNames[programType]}
          </CUI.Text>
          {rateComponents.map((rateComponent, rIndex) => (
            <CUI.ListItem key={rIndex} pl="7">
              {rateComponentDisplayNames[rateComponent]}:{" "}
              {table[programType][rateComponent]}
            </CUI.ListItem>
          ))}
        </CUI.List>
      ))}
      <CUI.List padding="0 0 1rem 2rem">
        <CUI.Text fontWeight="bold" mb="2">
          {programDisplayNames["Combined"]}:{" "}
          {table.Combined.weightedRate !== "-"
            ? table.Combined.weightedRate
            : table.Combined?.rate}
        </CUI.Text>
      </CUI.List>
      <CUI.Divider borderColor="gray.300" />
    </CUI.VStack>
  );
};

const horizontalRateTable = (
  table: TableDataShape,
  rateComponents: (
    | typeof defaultRateComponents[number]
    | typeof hybridRateComponents[number]
  )[]
) => {
  return (
    <CUI.Table variant="unstyled" mt="4" size="md" verticalAlign="top">
      <CUI.Thead>
        <CUI.Tr>
          <CUI.Td></CUI.Td>
          {programTypes.map((programTypes, index) => (
            <CUI.Th key={index} sx={sx.header}>
              {programTypes}
            </CUI.Th>
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

const horizontalValueTable = (tables: TableDataShape[]) => {
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

const verticalValueTable = (tables: TableDataShape[]) => {
  return (
    <CUI.VStack align="flex-start" mt="4">
      {programTypes.slice(0, -1).map((programType, ptIndex) => (
        <CUI.List
          key={ptIndex}
          padding="0 0 1rem 2rem"
          textTransform="capitalize"
        >
          <CUI.Text fontWeight="bold" mb="2">
            {programType === "Combined Rate" ? "Combined Count" : programTypes}
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

const getRateComponents = (
  DataSources: CombinedRatesPayload["DataSources"]
): (keyof WeightedRateShape)[] => {
  const includeWeights =
    DataSources.Medicaid.includesHybrid || DataSources.CHIP.includesHybrid;
  return includeWeights
    ? ["numerator", "denominator", "rate", "population", "weightedRate"]
    : ["numerator", "denominator", "rate"];
};

export const CombinedRateNDR = ({
  payload: { DataSources, Rates },
  year,
  measure,
}: Props) => {
  const rateComponents = getRateComponents(DataSources);
  provideDefaultValues(Rates);
  sortRates(Rates, year, measure);

  return (
    <CUI.Box sx={sx.tableContainer} mb="3rem">
      {Rates.map((table, index) => {
        const heading = table.category
          ? `${table.category} - ${table.label}`
          : table.label;
        return (
          <CUI.Box key={index} as={"section"}>
            <CUI.Heading fontSize="xl" mt="12" mb="2">
              {heading}
            </CUI.Heading>
            <CUI.Hide below="md">
              {horizontalRateTable(table, rateComponents)}
            </CUI.Hide>
            <CUI.Show below="md">
              {verticalRateTable(table, rateComponents)}
            </CUI.Show>
          </CUI.Box>
        );
      })}
      {valueTables.length > 0 && (
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
function provideDefaultValues(
  tables: PartialTableDataShape[]
): asserts tables is TableDataShape[] {
  for (let table of tables) {
    for (let programType of programTypes) {
      const notAnswered = programType === "Combined Rate" ? "" : "Not reported";
      // Set values to not answered if key doesn't exist
      const numerator = table[programType]?.numerator ?? notAnswered;
      const denominator = table[programType]?.denominator ?? notAnswered;
      const rate = table[programType]?.rate ?? "-";
      const mep =
        table[programType]?.["measure-eligible population"] ?? notAnswered;
      const weightRate = table[programType]?.["weighted rate"] ?? "-";
      const value =
        !table[programType]?.["value"] || table[programType]?.["value"] === ""
          ? notAnswered
          : table[programType]?.["value"];

      // Add value back to table object
      table[programType] = {
        ...table[programType]!,
        numerator,
        denominator,
        rate,
        ["measure-eligible population"]: mep,
        ["weighted rate"]: weightRate,
        value,
      };
    }
  }
}

/**
 * Sort the rates in-place, to match how they are displayed on individual measure pages.
 */
const sortRates = (
  tables: CombinedRatesPayload["Rates"],
  year: string,
  measure: string
) => {
  // Dynamically pull the rateLabelText by combined rates year so that we can get the cat and qual info of the measure
  const rateTextLabel = Labels[`RateLabel${year}` as keyof typeof Labels];
  const { categories, qualifiers } = rateTextLabel.getCatQualLabels(
    measure as keyof typeof rateTextLabel.data
  );
  // Build an array of uids in the order they are displayed in the pm section
  const uidOrder = categories.flatMap((cat) =>
    qualifiers.map((qual) => `${cat.id}.${qual.id}`)
  );
  tables.sort((a, b) => uidOrder.indexOf(a.uid) - uidOrder.indexOf(b.uid));
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
