import * as CUI from "@chakra-ui/react";
import { CombinedRatesPayload, ProgramTypeList, ProgramTypes } from "types";
import * as Labels from "labels/RateLabelTexts";

export const AdditionalCombinedValues = ({
  payload: { AdditionalValues, DataSources },
  year,
  measure,
}: Props) => {
  const displayValue = (
    row: typeof AdditionalValues[number],
    program: ProgramTypes
  ) => {
    const value = row[program];
    if (value !== undefined) {
      switch (row.uid) {
        case "zcwVcA.GWePur": // PCR Obs. Read. rate
        case "zcwVcA.ciVWdY": // PCR Exp. Read. count
        case "zcwVcA.qi3Vd7": // PCR Exp. Read. rate
        case "zcwVcA.SczxqV": // PCR O/E ratio
          return value.toFixed(4);
        case "zcwVcA.Nfe4Cn": // PCR Outlier rate
          return value.toFixed(1);
        default:
          return value.toString();
      }
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
      {AdditionalValues.length > 0 && (
        <CUI.Box mt="12" as={"section"}>
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
                {AdditionalValues.map((row, rIndex) => (
                  <CUI.Tr sx={sx.row} key={rIndex}>
                    <CUI.Th sx={sx.verticalHeader} scope="row">
                      {lookUpLabel(year, measure, row.uid)}
                    </CUI.Th>
                    {ProgramTypeList.map((programType, ptIndex) => (
                      <CUI.Td key={ptIndex} isNumeric sx={sx.content}>
                        {displayValue(row, programType)}
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
              {ProgramTypeList.map((programType, ptIndex) => (
                <CUI.List key={ptIndex} padding="0 0 1rem 2rem">
                  <CUI.Text fontWeight="bold" mb="2">
                    {programDisplayNames[programType]}
                  </CUI.Text>
                  {AdditionalValues.map((row, rIndex) => (
                    <CUI.ListItem key={rIndex} pl="7">
                      {lookUpLabel(year, measure, row.uid)}:
                      {displayValue(row, programType)}
                    </CUI.ListItem>
                  ))}
                </CUI.List>
              ))}
              <CUI.Divider borderColor="gray.300" />
            </CUI.VStack>
          </CUI.Show>
        </CUI.Box>
      )}
    </CUI.Box>
  );
};

/**
 * The label in the payload is set during calculation,
 * based on the values present on the measure.
 * Therefore, if a certain value was left unfilled in both measures,
 * that label will be empty.
 * In order to render a complete table,
 * we will look up the appropriate label text from the same place
 * as the individual measure pages.
 */
const lookUpLabel = (year: string, measure: string, uid: string) => {
  const rateTextLabel = Labels[`RateLabel${year}` as keyof typeof Labels];
  const { categories, qualifiers } = rateTextLabel.getCatQualLabels(
    measure as keyof typeof rateTextLabel.data
  );
  const [categoryId, qualifierId] = uid.split(".");
  const category = categories.find((cat) => cat.id == categoryId);
  const qualifier = qualifiers.find((qual) => qual.id == qualifierId);
  return [category?.label, qualifier?.label]
    .filter((label) => !!label)
    .join(" - ");
};

type Props = {
  payload: CombinedRatesPayload;
  year: string;
  measure: string;
};

const programDisplayNames = {
  Medicaid: "Medicaid",
  CHIP: "Separate CHIP",
  Combined: "Combined Count",
} as const;

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
  content: {
    textAlign: "right",
    paddingleft: "0px",
  },
  row: { borderBottom: "0.1px solid #D6D7D9" },
};
