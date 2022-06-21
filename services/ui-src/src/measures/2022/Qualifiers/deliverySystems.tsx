import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from "./Common";
import { useFieldArray, useWatch } from "react-hook-form";
import { DeliverySystem } from "./types";
import { BsPercent } from "react-icons/bs";
import { percentageAllowOneDecimalMax } from "utils/numberInputMasks";
import { useUser } from "hooks/authHooks";
import { UserRoles } from "types";
import { DataDriven } from "./data";

const initialDeliverySystemValue = {
  label: "",
  TwentyOneToSixtyFour: "",
  GreaterThanSixtyFour: "",
};

interface Props {
  data: DataDriven;
  year: string;
}

export const DeliverySystems = ({ data, year }: Props) => {
  const { userRole } = useUser();
  const { fields, append, remove } = useFieldArray({
    name: "PercentageEnrolledInEachDeliverySystem",
  });

  const values = useWatch({ name: "PercentageEnrolledInEachDeliverySystem" });

  return (
    <CUI.ListItem mr="4">
      <Common.QualifierHeader
        header="Delivery System"
        description={data.qualifierHeader(
          year ? `${parseInt(year) - 1}` : "2020"
        )}
      />
      <CUI.Table variant="simple" mt="4" size="md" verticalAlign="top">
        <CUI.Thead>
          <CUI.Tr>
            <CUI.Th key="labelRow"></CUI.Th>
            {data.textTable.map((textTableArr, index) => {
              return (
                <CUI.Th
                  key={`tabelHeaderContainer-${index}`}
                  textAlign={"center"}
                >
                  {textTableArr.map((str, idx) => {
                    return (
                      <CUI.Text
                        key={`labelRow.${index}.${idx}`}
                        data-cy={`labelRow.${index}.${idx}`}
                        fontSize={idx === 0 ? "md" : "sm"}
                      >
                        {str}
                      </CUI.Text>
                    );
                  })}
                </CUI.Th>
              );
            })}
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

              {data.fieldValues.map((fieldValue, idx, arr) => {
                return (
                  <CUI.Td key={`dataField.${idx}`}>
                    {userRole === UserRoles.STATE && (
                      <QMR.DeleteWrapper
                        allowDeletion={index >= 4 && !!(idx === arr.length - 1)}
                        onDelete={() => remove(index)}
                        showText={false}
                      >
                        <QMR.NumberInput
                          displayPercent
                          name={`PercentageEnrolledInEachDeliverySystem.${index}.${fieldValue}`}
                          numberInputProps={{ textAlign: "right" }}
                          mask={percentageAllowOneDecimalMax}
                        />
                      </QMR.DeleteWrapper>
                    )}
                    {userRole !== UserRoles.STATE && (
                      <QMR.NumberInput
                        displayPercent
                        name={`PercentageEnrolledInEachDeliverySystem.${index}.${fieldValue}`}
                        numberInputProps={{ textAlign: "right" }}
                        mask={percentageAllowOneDecimalMax}
                      />
                    )}
                  </CUI.Td>
                );
              })}
            </CUI.Tr>
          ))}
          <CUI.Tr>
            <CUI.Td px={"0"}>
              <QMR.ContainedButton
                buttonText={"+ Add Another"}
                buttonProps={{
                  variant: "outline",
                  colorScheme: "blue",
                  color: "blue.500",
                  w: "full",
                }}
                onClick={() => append(initialDeliverySystemValue)}
              />
            </CUI.Td>
          </CUI.Tr>
        </CUI.Tbody>
        <CUI.Tfoot borderTop="2px">
          <CUI.Tr>
            <CUI.Th px="none" textTransform="none">
              <CUI.Text fontSize="medium" color="gray.900">
                Total
              </CUI.Text>
            </CUI.Th>
            {data.fieldValues.map((field, idx) => {
              const total = values?.reduce(
                (acc: number, curr: DeliverySystem) => {
                  return acc + parseFloat(curr?.[field] || "0");
                },
                0
              );

              return (
                <CUI.Td key={`totalValField.${idx}`}>
                  <CUI.InputGroup>
                    <CUI.Input
                      isReadOnly
                      value={total?.toFixed(1) ?? ""}
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
              );
            })}
          </CUI.Tr>
        </CUI.Tfoot>
      </CUI.Table>
    </CUI.ListItem>
  );
};
