import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Q from "./";
import { useController, useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { ACSQualifierForm } from "../types";

export interface IDeliverySystem {
  // key: string;
  label: string;
  twentyOneToSixtyFour: number;
  greaterThanSixtyFour: number;
  type: string;
}
export interface Props {
  deliverySystemList: IDeliverySystem[];
}

export const DeliverySystems = () => {
  const { control } = useFormContext();
  const { field } = useController({
    name: "PercentageEnrolledInEachDeliverySystem",
    control,
  });
  console.log({ field });
  let [total21, total65]: number[] = [0, 0];
  const register = useCustomRegister<ACSQualifierForm>();

  return (
    <CUI.ListItem>
      <Q.QualifierHeader
        header="Delivery System"
        description="As of September 30, 2021 what percentage of your Medicaid/CHIP
          enrolees (above age 21) were enrolled in each delivery system?"
      />
      <CUI.Table variant="simple" mt="4">
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
          {field.value.map((ds: IDeliverySystem, index: number) => (
            <CUI.Tr key={"DeliverySystem" + "_" + index}>
              <CUI.Td px="none">
                <QMR.TextInput
                  name={`PercentageEnrolledInEachDeliverySystem.${index}.label`}
                  placeholder={ds.label}
                  textInputProps={{
                    _placeholder: { color: "black" },
                    isReadOnly: true,
                    border: "none",
                    value: ds.label,
                  }}
                />
              </CUI.Td>
              <CUI.Td textAlign="right">
                <QMR.NumberInput
                  displayPercent
                  {...register(
                    `PercentageEnrolledInEachDeliverySystem.${index}.twentyOneToSixtyFour`
                  )}
                />
              </CUI.Td>
              <CUI.Td>
                <QMR.NumberInput
                  displayPercent
                  {...register(
                    `PercentageEnrolledInEachDeliverySystem.${index}.greaterThanSixtyFour`
                  )}
                />
              </CUI.Td>
            </CUI.Tr>
          ))}
          {/* <QMR.ContainedButton
            buttonText={"+ Add Another"}
            buttonProps={{
              variant: "outline",
              colorScheme: "blue",
              textTransform: "capitalize",
              my: "5",
            }}
            onClick={() => {
              setDeliverySystems([
                ...deliverySystems,
                {
                  key: "",
                  label: "",
                  twentyOneToSixtyFour: 0,
                  greaterThanSixtyFour: 0,
                  type: "custom",
                },
              ]);
            }}
          /> */}
        </CUI.Tbody>
        <CUI.Tfoot borderTop="2px">
          <CUI.Tr>
            <CUI.Th px="none">
              <CUI.Text fontSize={15}>Total (all ages)</CUI.Text>
            </CUI.Th>
            <CUI.Th isNumeric>
              <CUI.Text fontSize={15}>{total21}%</CUI.Text>
            </CUI.Th>
            <CUI.Th isNumeric>
              <CUI.Text fontSize={15}>{total65}%</CUI.Text>
            </CUI.Th>
          </CUI.Tr>
        </CUI.Tfoot>
      </CUI.Table>
    </CUI.ListItem>
  );
};
