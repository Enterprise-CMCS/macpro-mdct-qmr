import * as Types from "shared/types";
import * as DC from "dataConstants";

export const validateFfsRadioButtonCompletion = (
  data: Types.DefinitionOfPopulation,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];

  // map the delivery systems to their respective nested selections
  const deliverySystemsMap = {
    [DC.FFS]: DC.DELIVERY_SYS_FFS,
    [DC.ICM]: DC.DELIVERY_SYS_ICM,
    [DC.PCCM]: DC.DELIVERY_SYS_PCCM,
    [DC.MCO_PIHP]: DC.DELIVERY_SYS_MCO_PIHP,
    [DC.OTHER]: DC.DELIVERY_SYS_OTHER,
  };

  const selectedDeliverySystems = data.DeliverySysRepresentationDenominator;
  if (selectedDeliverySystems) {
    selectedDeliverySystems.forEach((system) => {
      Object.entries(data).forEach((selection) => {
        // check if user has actually checked the nested radio button selection
        if (selection[0] === deliverySystemsMap[system] && !selection[1]) {
          errorArray.push({
            errorLocation: "Delivery Systems",
            errorMessage:
              errorMessage ??
              "You must indicate if the measure-eligible population is included",
          });
        }
      });
    });
  }

  return errorArray;
};
