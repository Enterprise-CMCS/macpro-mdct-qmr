import * as CUI from "@chakra-ui/react";
import {
  CombinedRatePayload,
  RateCategoryMap,
  RateDataShape,
  SeparatedData,
} from "./CombinedRateTypes";
import * as Labels from "labels/RateLabelTexts";

const programTypes = ["Medicaid", "Separate CHIP", "Combined Rate"] as const;
const defaultRateComponents = ["numerator", "denominator", "rate"] as const;
const hybridRateComponents = [
  "measure-eligible population",
  "weighted rate",
] as const;

type ProgramType = typeof programTypes[number];
/** Identifying info for each table we will display on the page */
type TableKeys = {
  uid: string;
  label: string;
  category?: string;
  type: string;
};
/** An intermediate shape, not guaranteed to have an entry for every program type */
type PartialTableDataShape = TableKeys &
  Partial<Record<ProgramType, RateDataShape>>;
/** Corresponds directly to the tables as we display them */
type TableDataShape = TableKeys & Record<ProgramType, RateDataShape>;
type Props = {
  json: CombinedRatePayload;
};

const verticalRateTable = (
  table: TableDataShape,
  rateComponents: (
    | typeof defaultRateComponents[number]
    | typeof hybridRateComponents[number]
  )[]
) => {
  return (
    <CUI.VStack align="flex-start" mt="4">
      {programTypes.slice(0, -1).map((programType, ptIndex) => (
        <CUI.List
          key={ptIndex}
          padding="0 0 1rem 2rem"
          textTransform="capitalize"
        >
          <CUI.Text fontWeight="bold" mb="2">
            {programType}
          </CUI.Text>
          {rateComponents.map((rateComponent, rIndex) => (
            <CUI.ListItem key={rIndex} pl="7">
              {rateComponent}: {table[programType][rateComponent]}
            </CUI.ListItem>
          ))}
        </CUI.List>
      ))}
      <CUI.List padding="0 0 1rem 2rem">
        <CUI.Text fontWeight="bold" mb="2">
          {programTypes[2]}:{" "}
          {table["Combined Rate"]?.["weighted rate"] != "-"
            ? table["Combined Rate"]?.["weighted rate"]
            : table["Combined Rate"]?.rate}
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

const getRateComponent = (json: CombinedRatePayload) => {
  const dataSources = json.data
    .map((item) => (item as SeparatedData)?.dataSource)
    .flat();

  const hybridDataSources = [
    "HybridAdministrativeandMedicalRecordsData",
    "Casemanagementrecordreview",
  ];
  const isHybrid = dataSources?.some((src) => hybridDataSources.includes(src));
  return [...defaultRateComponents, ...(isHybrid ? hybridRateComponents : [])];
};

export const CombinedRateNDR = ({ json }: Props) => {
  const tables = collectRatesForDisplay(json);
  provideDefaultValues(tables);
  sortRates(tables, json.year, json.measure);

  const rateTables = tables.filter((table) => table.type === "rate");
  const valueTables = tables.filter((table) => table.type === "value");
  const rateComponents = getRateComponent(json);

  return (
    <CUI.Box sx={sx.tableContainer} mb="3rem">
      {rateTables.map((table, index) => {
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

const collectRatesForDisplay = (
  json: CombinedRatePayload
): PartialTableDataShape[] => {
  const tables: PartialTableDataShape[] = [];
  const data = json.data;

  // Filter data by Medicaid, CHIP, and Combined Rates
  const medicaidData = (data?.find((item) => item.column == "Medicaid")
    ?.rates ?? {}) as RateCategoryMap;
  const chipData = (data?.find((item) => item.column == "CHIP")?.rates ??
    {}) as RateCategoryMap;
  const combinedRatesData = (data?.find(
    (item) => item.column == "Combined Rate"
  )?.rates ?? []) as RateDataShape[];

  //extra fields to track for hybrid data
  const medicaidMEP = (
    data?.find((item) => item.column == "Medicaid") as SeparatedData
  )["measure-eligible population"];
  const chipMEP = (
    data?.find((item) => item.column == "CHIP") as SeparatedData
  )["measure-eligible population"];

  const rememberRate = (rate: RateDataShape, program: ProgramType) => {
    let existingTable = tables.find((t) => t.uid === rate.uid);
    let type = rate.hasOwnProperty("value") ? "value" : "rate";

    if (existingTable) {
      existingTable[program] = rate;
    } else {
      tables.push({
        uid: rate.uid,
        category: rate.category,
        label: rate.label,
        [program]: rate,
        type: type,
      });
    }
  };
  for (let medicaidRate of Object.values(medicaidData).flat()) {
    medicaidRate["measure-eligible population"] = medicaidMEP;
    rememberRate(medicaidRate, "Medicaid");
  }
  for (let chipRate of Object.values(chipData).flat()) {
    chipRate["measure-eligible population"] = chipMEP;
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
const sortRates = (tables: TableDataShape[], year: string, measure: string) => {
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
