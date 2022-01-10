import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Q from "./";
import { useController, useFormContext } from "react-hook-form";
import { DeliverySystem } from "../types";

export const DeliverySystems = () => {
  const { control } = useFormContext();
  const { field } = useController({
    name: "PercentageEnrolledInEachDeliverySystem",
    control,
  });

  const total21To64Percent = field.value.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.TwentyOneToSixtyFour || "0");
    },
    0
  );

  const total65AndOlderPercent = field.value.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.GreaterThanSixtyFour || "0");
    },
    0
  );

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
          {field.value.map((ds: DeliverySystem, index: number) => (
            <CUI.Tr key={`PercentageEnrolledInEachDeliverySystem.${index}.key`}>
              <CUI.Td px="none">
                <QMR.TextInput
                  name={`PercentageEnrolledInEachDeliverySystem.${index}.key`}
                  placeholder={ds.label}
                  textInputProps={{
                    _placeholder: { color: "black" },
                    isReadOnly: true,
                    border: "none",
                    value: ds.label,
                    // dont focus to the input
                    tabIndex: -1,
                  }}
                />
              </CUI.Td>
              <CUI.Td textAlign="right">
                <QMR.NumberInput
                  displayPercent
                  name={`PercentageEnrolledInEachDeliverySystem.${index}.TwentyOneToSixtyFour`}
                />
              </CUI.Td>
              <CUI.Td>
                <QMR.NumberInput
                  displayPercent
                  name={`PercentageEnrolledInEachDeliverySystem.${index}.GreaterThanSixtyFour`}
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
                  TwentyOneToSixtyFour: 0,
                  GreaterThanSixtyFour: 0,
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
              <CUI.Text fontSize={15}>{total21To64Percent}%</CUI.Text>
            </CUI.Th>
            <CUI.Th isNumeric>
              <CUI.Text fontSize={15}>{total65AndOlderPercent}%</CUI.Text>
            </CUI.Th>
          </CUI.Tr>
        </CUI.Tfoot>
      </CUI.Table>
    </CUI.ListItem>
  );
};
