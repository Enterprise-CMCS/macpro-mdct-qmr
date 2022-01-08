import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import * as Q from "./";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

interface IDeliverySystem {
  key: string;
  label: string;
  twentyOneToSixtyFour: number;
  greaterThanSixtyFour: number;
  type: string;
}
interface Props {
  deliverySystemList: IDeliverySystem[];
}

export const DeliverySystems = (
  { deliverySystemList }: Props = {
    deliverySystemList: [
      {
        key: "feeForService",
        label: "Fee-for-Service",
        twentyOneToSixtyFour: 0,
        greaterThanSixtyFour: 0,
        type: "default",
      },
      {
        key: "pccm",
        label: "PCCM",
        twentyOneToSixtyFour: 0,
        greaterThanSixtyFour: 0,
        type: "default",
      },
      {
        key: "managedCare",
        label: "Managed Care",
        twentyOneToSixtyFour: 0,
        greaterThanSixtyFour: 0,
        type: "default",
      },
      {
        key: "integtatedCareModel",
        label: "Integrated Care Model (ICM)",
        twentyOneToSixtyFour: 0,
        greaterThanSixtyFour: 0,
        type: "default",
      },
    ],
  }
) => {
  const { control } = useFormContext();
  const { field } = useController({
    name: "deliverySystem",
    control,
  });
  let [total21, total65]: number[] = [0, 0];
  const [deliverySystems, setDeliverySystems] =
    useState<IDeliverySystem[]>(deliverySystemList);
  const customLabelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value === "[object Object]" ? "" : e.target.value;

    setDeliverySystems(
      deliverySystems.map((item: IDeliverySystem, idx: number) => {
        if (item.type === "custom" && idx === index) {
          item.label = "customName";
          item.key = value.split(" ").join("-");
        }
        return item;
      })
    );
  };
  const updateTotals = () => {
    total21 = deliverySystems.reduce(
      (total21, { twentyOneToSixtyFour }) => total21 + twentyOneToSixtyFour,
      0
    );

    total65 = deliverySystems.reduce(
      (total65, { greaterThanSixtyFour }) => total65 + greaterThanSixtyFour,
      0
    );
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setDeliverySystems(
      deliverySystems.map((ds: IDeliverySystem, dsIndex: number) => {
        if (dsIndex === index) {
          if (e.target.name.includes("-65")) {
            ds.greaterThanSixtyFour = parseInt(e.target.value) || 0;
          } else {
            ds.twentyOneToSixtyFour = parseInt(e.target.value) || 0;
          }
        }
        return ds;
      })
    );
    updateTotals();
  };
  updateTotals();
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
            <CUI.Th>
              <CUI.Text textAlign="center" fontSize={15} flex={1.5}>
                Ages 21 to 64
              </CUI.Text>
            </CUI.Th>
            <CUI.Th>
              <CUI.Text textAlign="center" fontSize={15} flex={1.5}>
                Age 65 and older
              </CUI.Text>
            </CUI.Th>
          </CUI.Tr>
        </CUI.Thead>
        <CUI.Tbody>
          {deliverySystems.map((ds: IDeliverySystem, index: number) => (
            <CUI.Tr>
              <CUI.Td>
                {ds.type === "default" ? (
                  <>
                    <CUI.FormLabel flex={1.5} fontWeight={"semibold"}>
                      {ds.label}
                    </CUI.FormLabel>
                  </>
                ) : (
                  <CUI.Box>
                    <CUI.Input
                      name={`deliverySystem.${index}.${ds.key}-name`}
                      value={ds.key}
                      type="text"
                      aria-label={`deliverySystem.${index}.${ds.key}-name`}
                      flex={1.5}
                      onChange={(e) => customLabelChange(e, index)}
                      fontWeight={"semibold"}
                      data-testid={`deliverySystem.${index}.${ds.key}-name`}
                    />
                  </CUI.Box>
                )}
              </CUI.Td>
              <CUI.Td>
                <Inputs.NumberInput
                  displayPercent
                  name={`deliverySystem.${index}.${ds.key}-21-64`}
                  data-testid={`deliverySystem.${index}.${ds.key}-21-64`}
                  formControlProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(() => handleInputChange(e, index));
                    },
                    textAlign: "right",
                  }}
                />
              </CUI.Td>
              <CUI.Td>
                <Inputs.NumberInput
                  displayPercent
                  name={`deliverySystem.${index}.${ds.key}-65`}
                  data-testid={`deliverySystem.${index}.${ds.key}-65`}
                  formControlProps={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(() => handleInputChange(e, index));
                    },
                    textAlign: "right",
                  }}
                />
              </CUI.Td>
            </CUI.Tr>
          ))}
        </CUI.Tbody>
        <CUI.Tfoot>
          <CUI.Tr>
            <CUI.Th>
              <CUI.Text fontSize={15} flex={1.5}>
                Total (all ages)
              </CUI.Text>
            </CUI.Th>
            <CUI.Th isNumeric>
              <CUI.Text fontSize={15} flex={1.5}>
                {total21}%
              </CUI.Text>
            </CUI.Th>
            <CUI.Th isNumeric>
              <CUI.Text fontSize={15} flex={1.5}>
                {total65}%
              </CUI.Text>
            </CUI.Th>
          </CUI.Tr>
        </CUI.Tfoot>
      </CUI.Table>
      <QMR.ContainedButton
        buttonText={"+ Add Another"}
        buttonProps={{
          variant: "outline",
          colorScheme: "blue",
          textTransform: "capitalize",
          mt: "5",
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
          updateTotals();
        }}
      />
    </CUI.ListItem>
  );
};
