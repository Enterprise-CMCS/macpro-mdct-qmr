// import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Qualifier } from "coreSets/adultMeasures/types";

interface IDeliverySystem {
  key: string;
  label: string;
  twentyOneToSixtyFour: number;
  greaterThanSixtyFour: number;
}

interface IDeliverySystemSet {
  set: IDeliverySystem[];
}

interface Props {
  deliverySystemList: IDeliverySystemSet[];
  label: string;
}

export const DeliverySystems = (
  { deliverySystemList, label }: Props = {
    deliverySystemList: [
      {
        set: [
          {
            key: "feeForService",
            label: "Fee-for-Service",
            twentyOneToSixtyFour: 0,
            greaterThanSixtyFour: 0,
          },
          {
            key: "pccm",
            label: "PCCM",
            twentyOneToSixtyFour: 0,
            greaterThanSixtyFour: 0,
          },
          {
            key: "managedCare",
            label: "Managed Care",
            twentyOneToSixtyFour: 0,
            greaterThanSixtyFour: 0,
          },
          {
            key: "integtatedCareModel",
            label: "Integrated Care Model (ICM)",
            twentyOneToSixtyFour: 0,
            greaterThanSixtyFour: 0,
          },
        ],
      },
    ],
    label: "1. Delivery System",
  }
) => {
  const register = useCustomRegister<Qualifier.Form>();

  return (
    // <QMR.CoreQuestionWrapper label={label}>
    <CUI.Stack spacing="4">
      <CUI.HStack>
        <CUI.Spacer flex={1.5} />
        <CUI.FormLabel flex={1} pl="4">
          Ages 21 to 64
        </CUI.FormLabel>
        <CUI.FormLabel flex={1} pl="4">
          Age 65 and older
        </CUI.FormLabel>
      </CUI.HStack>
      {deliverySystemList.map((dsSet: IDeliverySystemSet, index: number) =>
        dsSet.set.map((field: IDeliverySystem) => {
          return (
            <CUI.Stack key={`${field.key}.${index}`}>
              <CUI.HStack>
                {/* <QMR.CoreQuestionWrapper label="9. Other Performance Measure"> */}
                <CUI.FormLabel flex={1.5}>{field.label}</CUI.FormLabel>
                <Inputs.NumberInput
                  displayPercent={true}
                  name={`${field.key}-21-64-${index}`}
                  formControlProps={{
                    flex: 1,
                  }}
                />
                <Inputs.NumberInput
                  displayPercent={true}
                  name={`${field.key}-65-${index}`}
                  formControlProps={{
                    flex: 1,
                  }}
                />
                {/* </QMR.CoreQuestionWrapper> */}
              </CUI.HStack>
            </CUI.Stack>
          );
        })
      )}
      {label}
    </CUI.Stack>

    // </QMR.CoreQuestionWrapper>
  );
};

// const DeliverySystem = ({ system }: IDeliverySystem) => {
//   return (
//     <CUI.HStack spacing={2}>
//       <Inputs.NumberInput
//         name={`${name}.${index}.numerator`}
//         label="Numerator"
//       />
//       <Inputs.NumberInput
//         name={`${name}.${index}.denominator`}
//         label="Denominator"
//       />
//       <Inputs.NumberInput name={`${name}.${index}.rate`} label="Rate" />
//     </CUI.HStack>
//   );
// };
