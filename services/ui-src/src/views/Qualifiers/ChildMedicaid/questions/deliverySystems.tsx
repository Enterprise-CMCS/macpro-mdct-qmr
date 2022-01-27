import { useState } from "react";
import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Q from ".";
import { useController, useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DeliverySystem, CCSMQualifierForm } from "../types";
import { BsPercent } from "react-icons/bs";

interface DefaultDeliverySystemTableRecordProps {
  record: string;
  label: string;
}

const DefaultDeliverySystemTableRecord = ({
  record,
  label,
}: DefaultDeliverySystemTableRecordProps) => (
  <CUI.Tr>
    <CUI.Td px="none">
      <CUI.Text>{label}</CUI.Text>
    </CUI.Td>
    <CUI.Td>
      <QMR.NumberInput
        displayPercent
        name={`${record}.UnderTwentyOne`}
        numberInputProps={{ textAlign: "right" }}
      />
    </CUI.Td>
  </CUI.Tr>
);

interface CustomDeliverySystemTableRecordProps {
  record: string;
}

const CustomDeliverySystemTableRecord = ({
  record,
}: CustomDeliverySystemTableRecordProps) => {
  const register = useCustomRegister<CCSMQualifierForm>();
  return (
    <CUI.Tr>
      <CUI.Td px="none">
        <QMR.TextInput
          {...register(
            // @ts-ignore
            `${record}.key`
          )}
        />
      </CUI.Td>
      <CUI.Td>
        <QMR.NumberInput
          displayPercent
          name={`${record}.UnderTwentyOne`}
          numberInputProps={{ textAlign: "right" }}
        />
      </CUI.Td>
    </CUI.Tr>
  );
};

export const DeliverySystems = () => {
  const { control, watch } = useFormContext();
  const { field } = useController({
    name: "PercentageEnrolledInEachDeliverySystem",
    control,
  });

  const [deliverySystems, setDeliverySystems] = useState(field.value);

  const values = watch("PercentageEnrolledInEachDeliverySystem");

  const totalUnder21Percent = values.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.UnderTwentyOne || "0");
    },
    0
  );

  const handleAddDeliverySystemValue = () => {
    setDeliverySystems([
      ...deliverySystems,
      {
        key: `CustomDeliverySystemRecord_${values.length}`,
        label: "",
        UnderTwentyOne: "",
        userGenerated: true,
      },
    ]);
  };

  return (
    <CUI.ListItem>
      <Q.QualifierHeader
        header="Delivery System"
        description="As of September 30, 2021 what percentage of your Medicaid/CHIP
          enrolees (above age 21) were enrolled in each delivery system?"
      />
      <CUI.Table variant="simple" mt="4" size="md">
        <CUI.Thead>
          <CUI.Tr>
            <CUI.Th></CUI.Th>
            <CUI.Th textAlign="center" fontSize="md">
              <CUI.Text fontSize="sm">Under Age 21</CUI.Text>
            </CUI.Th>
          </CUI.Tr>
        </CUI.Thead>
        <CUI.Tbody>
          {deliverySystems.map((ds: DeliverySystem, index: number) =>
            !ds.userGenerated ? (
              <DefaultDeliverySystemTableRecord
                record={`PercentageEnrolledInEachDeliverySystem.${index}`}
                key={`PercentageEnrolledInEachDeliverySystem.${index}`}
                label={ds.label}
              />
            ) : (
              <CustomDeliverySystemTableRecord
                record={`PercentageEnrolledInEachDeliverySystem.${index}`}
                key={`PercentageEnrolledInEachDeliverySystem.${index}`}
              />
            )
          )}
          <QMR.ContainedButton
            buttonText={"+ Add Another"}
            buttonProps={{
              variant: "outline",
              colorScheme: "blue",
              textTransform: "capitalize",
              my: "5",
            }}
            onClick={handleAddDeliverySystemValue}
          />
        </CUI.Tbody>
        <CUI.Tfoot borderTop="2px">
          <CUI.Tr>
            <CUI.Th px="none" textTransform="none">
              <CUI.Text fontSize="medium" color="gray.900">
                Total (all ages)
              </CUI.Text>
            </CUI.Th>
            <CUI.Td>
              <CUI.InputGroup>
                <CUI.Input
                  isReadOnly
                  value={totalUnder21Percent}
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
