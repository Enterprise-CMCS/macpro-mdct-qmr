import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from "../Common";
import { useFieldArray, useWatch } from "react-hook-form";
import { DeliverySystem } from "./types";
import { BsPercent } from "react-icons/bs";
import { percentageAllowOneDecimalMax } from "utils/numberInputMasks";
import { useParams } from "react-router-dom";

const initialDeliverySystemValue = {
  label: "",
  TwentyOneToSixtyFour: "",
  GreaterThanSixtyFour: "",
};

export const DeliverySystems = () => {
  const { year } = useParams();
  const { fields, append, remove } = useFieldArray({
    name: "PercentageEnrolledInEachDeliverySystem",
  });

  const values = useWatch({ name: "PercentageEnrolledInEachDeliverySystem" });

  const total21To64Percent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.TwentyOneToSixtyFour || "0");
    },
    0
  );

  const total65AndOlderPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.GreaterThanSixtyFour || "0");
    },
    0
  );

  return (
    <CUI.ListItem mr="4">
      <Common.QualifierHeader
        header="Delivery System"
        description={`As of September 30, ${
          year ? parseInt(year) - 1 : "2020"
        } what percentage of your Medicaid/CHIP
          enrollees (above age 21) were enrolled in each delivery system?`}
      />
      <CUI.Table variant="simple" mt="4" size="md" verticalAlign="top">
        <CUI.Thead>
          <CUI.Tr>
            <CUI.Th></CUI.Th>
            <CUI.Th textAlign="center" fontSize="md">
              <CUI.Text>Ages 21 to 64</CUI.Text>
            </CUI.Th>
            <CUI.Th textAlign="center" fontSize="md">
              <CUI.Text>Age 65 and older</CUI.Text>
            </CUI.Th>
          </CUI.Tr>
        </CUI.Thead>
        <CUI.Tbody>
          {fields?.map((field, index: number) => (
            <CUI.Tr verticalAlign="top" key={field.id}>
              <CUI.Td px="none">
                {index >= 4 ? (
                  <QMR.TextInput
                    rules={{ required: true }}
                    name={`PercentageEnrolledInEachDeliverySystem.${index}.label`}
                  />
                ) : (
                  <QMR.TextInput
                    rules={{ required: true }}
                    textInputProps={{
                      isReadOnly: true,
                      border: "none",
                      pl: "0",
                      tabIndex: -1,
                    }}
                    name={`PercentageEnrolledInEachDeliverySystem.${index}.label`}
                  />
                )}
              </CUI.Td>
              <CUI.Td>
                <QMR.NumberInput
                  displayPercent
                  name={`PercentageEnrolledInEachDeliverySystem.${index}.TwentyOneToSixtyFour`}
                  numberInputProps={{ textAlign: "right" }}
                  mask={percentageAllowOneDecimalMax}
                />
              </CUI.Td>
              <CUI.Td>
                <QMR.DeleteWrapper
                  allowDeletion={index >= 4}
                  onDelete={() => remove(index)}
                  showText={false}
                >
                  <QMR.NumberInput
                    displayPercent
                    name={`PercentageEnrolledInEachDeliverySystem.${index}.GreaterThanSixtyFour`}
                    numberInputProps={{ textAlign: "right" }}
                    mask={percentageAllowOneDecimalMax}
                  />
                </QMR.DeleteWrapper>
              </CUI.Td>
            </CUI.Tr>
          ))}
          <QMR.ContainedButton
            buttonText={"+ Add Another"}
            buttonProps={{
              variant: "outline",
              colorScheme: "blue",
              my: "5",
            }}
            onClick={() => append(initialDeliverySystemValue)}
          />
        </CUI.Tbody>
        <CUI.Tfoot borderTop="2px">
          <CUI.Tr>
            <CUI.Th px="none" textTransform="none">
              <CUI.Text fontSize="medium" color="gray.900">
                Total
              </CUI.Text>
            </CUI.Th>
            <CUI.Td>
              <CUI.InputGroup>
                <CUI.Input
                  isReadOnly
                  value={total21To64Percent.toFixed(1)}
                  border="none"
                  textAlign="right"
                  fontWeight="bold"
                  tabIndex={-1}
                />

                <CUI.InputRightElement
                  pointerEvents="none"
                  children={<BsPercent />}
                />
              </CUI.InputGroup>
            </CUI.Td>
            <CUI.Td>
              <CUI.InputGroup>
                <CUI.Input
                  isReadOnly
                  value={total65AndOlderPercent.toFixed(1)}
                  border="none"
                  textAlign="right"
                  fontWeight="bold"
                  tabIndex={-1}
                />

                <CUI.InputRightElement
                  pointerEvents="none"
                  children={<BsPercent />}
                />
              </CUI.InputGroup>
            </CUI.Td>
          </CUI.Tr>
        </CUI.Tfoot>
      </CUI.Table>
    </CUI.ListItem>
  );
};
