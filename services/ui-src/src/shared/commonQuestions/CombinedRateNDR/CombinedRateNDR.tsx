import * as CUI from "@chakra-ui/react";
import { CombinedRatesPayload, ProgramTypeList, ProgramTypes } from "types";
import * as Labels from "labels/RateLabelTexts";

export const CombinedRateNDR = ({
  payload: { DataSources, Rates },
  year,
  measure,
}: Props) => {
  sortRates(Rates, year, measure);

  const includeWeights =
    DataSources.Medicaid.requiresWeightedCalc ||
    DataSources.CHIP.requiresWeightedCalc;
  const rateComponents = includeWeights
    ? ([
        "numerator",
        "denominator",
        "rate",
        "population",
        "weightedRate",
      ] as const)
    : (["numerator", "denominator", "rate"] as const);

  const displayValue = (
    table: typeof Rates[number],
    program: ProgramTypes,
    rateComponent: typeof rateComponents[number]
  ) => {
    const value = table[program][rateComponent];
    if (value !== undefined) {
      if (rateComponent === "rate" || rateComponent === "weightedRate") {
        return value.toFixed(1);
      } else {
        return value.toString();
      }
    } else if (rateComponent === "rate" || rateComponent === "weightedRate") {
      return "-";
    } else if (program === ProgramTypes.Combined) {
      return "";
    } else if (DataSources[program].isUnusableForCalc) {
      return "Not Applicable";
    } else {
      return "Not Reported";
    }
  };

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
              {/* This is the desktop version of the table */}
              <CUI.Table
                variant="unstyled"
                mt="4"
                size="md"
                verticalAlign="top"
              >
                <CUI.Thead>
                  <CUI.Tr>
                    <CUI.Td></CUI.Td>
                    {ProgramTypeList.map((programType, index) => (
                      <CUI.Th key={index} sx={sx.header}>
                        {programDisplayNames[programType]}
                      </CUI.Th>
                    ))}
                  </CUI.Tr>
                </CUI.Thead>
                <CUI.Tbody>
                  {rateComponents.map((rateComponent, rIndex) => (
                    <CUI.Tr key={rIndex} sx={sx.row}>
                      <CUI.Th sx={sx.verticalHeader} scope="row">
                        {rateComponentDisplayNames[rateComponent]}
                      </CUI.Th>
                      {ProgramTypeList.map((programType, ptIndex) => (
                        <CUI.Td key={ptIndex} sx={sx.header}>
                          {displayValue(table, programType, rateComponent)}
                        </CUI.Td>
                      ))}
                    </CUI.Tr>
                  ))}
                </CUI.Tbody>
              </CUI.Table>
            </CUI.Hide>
            <CUI.Show below="md">
              {/* This is the mobile version of the table */}
              <CUI.VStack align="flex-start" mt="4">
                {[ProgramTypes.Medicaid, ProgramTypes.CHIP].map(
                  (programType, ptIndex) => (
                    <CUI.List key={ptIndex} padding="0 0 1rem 2rem">
                      <CUI.Text fontWeight="bold" mb="2">
                        {programDisplayNames[programType]}
                      </CUI.Text>
                      {rateComponents.map((rateComponent, rIndex) => (
                        <CUI.ListItem key={rIndex} pl="7">
                          {rateComponentDisplayNames[rateComponent]}:{" "}
                          {displayValue(table, programType, rateComponent)}
                        </CUI.ListItem>
                      ))}
                    </CUI.List>
                  )
                )}
                <CUI.List padding="0 0 1rem 2rem">
                  <CUI.Text fontWeight="bold" mb="2">
                    {programDisplayNames.Combined}:{" "}
                    {table.Combined.weightedRate ?? table.Combined.rate ?? "-"}
                  </CUI.Text>
                </CUI.List>
                <CUI.Divider borderColor="gray.300" />
              </CUI.VStack>
            </CUI.Show>
          </CUI.Box>
        );
      })}
    </CUI.Box>
  );
};

/*
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
  // An array of uids in the correct order for display
  const uidOrder = categories.flatMap((cat) =>
    qualifiers.map((qual) => `${cat.id}.${qual.id}`)
  );
  tables.sort((a, b) => uidOrder.indexOf(a.uid) - uidOrder.indexOf(b.uid));
};

const programDisplayNames = {
  Medicaid: "Medicaid",
  CHIP: "Separate CHIP",
  Combined: "Combined Rate",
} as const;

const rateComponentDisplayNames = {
  numerator: "Numerator",
  denominator: "Denominator",
  rate: "Rate",
  population: "Measure-Eligible Population",
  weightedRate: "Weighted Rate",
} as const;

type Props = {
  payload: CombinedRatesPayload;
  year: string;
  measure: string;
};

const sx = {
  tableContainer: {
    maxWidth: "718px",
  },
  header: {
    textAlign: "right",
    fontSize: "16px",
    color: "black",
    letterSpacing: "normal",
    textTransform: "initial",
  },
  verticalHeader: {
    fontWeight: "semibold",
    fontSize: "16px",
    color: "black",
    letterSpacing: "normal",
    textTransform: "initial",
  },
  row: { borderBottom: "0.1px solid #D6D7D9" },
};
