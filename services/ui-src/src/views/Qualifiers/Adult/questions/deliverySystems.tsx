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
    <>
      <Q.QualifierHeader
        header="1. Delivery System"
        description="As of September 30, 2021 what percentage of your Medicaid/CHIP
          enrolees (above age 21) were enrolled in each delivery system?"
      />
      <CUI.Stack spacing="4" mt="6">
        <CUI.HStack>
          <CUI.Spacer flex={1.5} />
          <CUI.FormLabel flex={1} pl="4">
            Ages 21 to 64
          </CUI.FormLabel>
          <CUI.FormLabel flex={1} pl="4">
            Age 65 and older
          </CUI.FormLabel>
        </CUI.HStack>
        {deliverySystems.map((ds: IDeliverySystem, index: number) => (
          <CUI.Stack key={`${index}`}>
            <CUI.HStack>
              {ds.type === "default" ? (
                <>
                  <CUI.FormLabel flex={1.5} fontWeight={"semibold"}>
                    {ds.label}
                  </CUI.FormLabel>
                </>
              ) : (
                <CUI.Box w="43%">
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
              <Inputs.NumberInput
                displayPercent={true}
                name={`deliverySystem.${index}.${ds.key}-21-64`}
                data-testid={`deliverySystem.${index}.${ds.key}-21-64`}
                formControlProps={{
                  flex: 1,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(() => handleInputChange(e, index));
                  },
                  textAlign: "right",
                }}
              />
              <Inputs.NumberInput
                displayPercent={true}
                name={`deliverySystem.${index}.${ds.key}-65`}
                data-testid={`deliverySystem.${index}.${ds.key}-65`}
                formControlProps={{
                  flex: 1,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(() => handleInputChange(e, index));
                  },
                  textAlign: "right",
                }}
              />
            </CUI.HStack>
          </CUI.Stack>
        ))}
        <QMR.ContainedButton
          buttonText={"+ Add Another"}
          buttonProps={{
            variant: "outline",
            colorScheme: "blue",
            textTransform: "capitalize",
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
        <CUI.Divider />
        <CUI.HStack fontWeight="bold">
          <CUI.Text flex={1.5}>Total (all ages)</CUI.Text>
          <CUI.Text flex={1.8} align="right">
            {total21}%
          </CUI.Text>
          <CUI.Text flex={1.5} align="right">
            {total65}%
          </CUI.Text>
        </CUI.HStack>
      </CUI.Stack>
    </>
  );
};
