import { initialAuditValues } from "./Common";

interface DataDriven {
  title: string;
  formData: any;
  questionTitle: string;
}

const AdultData: DataDriven = {
  title: "Adult Core Set Qualifiers",
  questionTitle: "Adult Core Set Questions",
  formData: {
    CoreSetMeasuresAuditedOrValidatedDetails: [initialAuditValues],
    PercentageEnrolledInEachDeliverySystem: [
      {
        label: "Fee-for-Service",
        TwentyOneToSixtyFour: "",
        GreaterThanSixtyFour: "",
      },
      {
        label: "PCCM",
        TwentyOneToSixtyFour: "",
        GreaterThanSixtyFour: "",
      },
      {
        label: "Managed Care",
        TwentyOneToSixtyFour: "",
        GreaterThanSixtyFour: "",
      },
      {
        label: "Integrated Care Model (ICM)",
        TwentyOneToSixtyFour: "",
        GreaterThanSixtyFour: "",
      },
    ],
  },
};

// const ChildData: DataDriven = {};

// const ChildChipData: DataDriven = {};

// const ChildMedicaidData: DataDriven = {};

// const HomeData: DataDriven = {};

export const Data = {
  // HHCS: HomeData,
  ACS: AdultData,
  // CCS: ChildData,
  // CCSC: ChildChipData,
  // CCSM: ChildMedicaidData,
};
