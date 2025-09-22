import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from "shared/Qualifiers/Common";
import { useFieldArray, useWatch } from "react-hook-form";
import { DataDriven, DeliverySystem } from "shared/types/TypeQualifierForm";
import { BsPercent } from "react-icons/bs";
import { percentageAllowOneDecimalMax } from "utils";
import { useUser } from "hooks/authHooks";
import { UserRoles } from "types";

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
  console.log("data in DeliverySystems:", data);
  console.log("year in DeliverySystems:", year);
  const { userRole } = useUser();
  console.log("USER ROLE:", userRole);
  const { fields, append, remove } = useFieldArray({
    name: "PercentageEnrolledInEachDeliverySystem",
  });

  const values = useWatch({ name: "PercentageEnrolledInEachDeliverySystem" });

  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader
        header="Delivery System"
        description={data.qualifierHeader(`${parseInt(year) - 1}`)}
      />
      <CUI.Table variant="simple" mt="4" size="md" verticalAlign="top">
        <CUI.Thead>
          <CUI.Tr>
            <CUI.Th key="labelRow" minWidth={"xs"}></CUI.Th>
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
                    ariaLabel={`Percentage enrolled in each delivery system - ${
                      values?.[index]?.label
                        ? `${values?.[index]?.label}`
                        : "Enter Custom Label"
                    }`}
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
                    ariaLabel={`Percentage enrolled in each delivery system - ${values?.[index]?.label}`}
                  />
                )}
              </CUI.Td>

              {data.fieldValues.map((fieldValue, idx, arr) => {
                return (
                  <CUI.Td key={`dataField.${idx}`}>
                    {userRole === UserRoles.STATE_USER && (
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
                          ariaLabel={`Percentage enrolled in each delivery system - ${
                            values?.[index]?.label
                              ? `${values?.[index]?.label} - `
                              : ""
                          }${data.textTable[idx]}`}
                        />
                      </QMR.DeleteWrapper>
                    )}
                    {/* only display to admin-type users (admin, approver, help desk, internal) */}
                    {userRole !== UserRoles.STATE_USER && (
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
                  width: "full",
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
                      type="text"
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
