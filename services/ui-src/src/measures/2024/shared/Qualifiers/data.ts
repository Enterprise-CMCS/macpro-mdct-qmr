import { initialAuditValues } from "./Common";

export interface DataDriven {
  title: string;
  formData: any;
  questionTitle: string;
  qualifierHeader: (year: string) => string;
  textTable: string[][];
  fieldValues: string[];
}

const AdultData: DataDriven = {
  title: "Adult Core Set Qualifiers: Medicaid",
  questionTitle: "Adult Core Set Questions: Medicaid",
  qualifierHeader: (year) =>
    `As of September 30, ${year}, what percentage of your Medicaid (Title XIX & XXI) enrollees (age 21 and older) were enrolled in each delivery system?`,
  textTable: [
    ["Medicaid (Title XIX & XXI)", "Ages 21 to 64"],
    ["Medicaid (Title XIX & XXI)", "Age 65 and older"],
  ],
  fieldValues: ["TwentyOneToSixtyFour", "GreaterThanSixtyFour"],
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

const AdultChipData: DataDriven = {
  title: "Adult Core Set Qualifiers: CHIP",
  questionTitle: "Adult Core Set Questions: CHIP",
  qualifierHeader: (year) =>
    `As of September 30, ${year}, what percentage of your separate CHIP enrollees (age 21 and older) were enrolled in each delivery system?`,
  textTable: [["Separate CHIP", "Ages 21 to 64"]],
  fieldValues: ["TwentyOneToSixtyFour"],
  formData: {
    CoreSetMeasuresAuditedOrValidatedDetails: [initialAuditValues],
    PercentageEnrolledInEachDeliverySystem: [
      {
        label: "Fee-for-Service",
        TwentyOneToSixtyFour: "",
      },
      {
        label: "PCCM",
        TwentyOneToSixtyFour: "",
      },
      {
        label: "Managed Care",
        TwentyOneToSixtyFour: "",
      },
      {
        label: "Integrated Care Model (ICM)",
        TwentyOneToSixtyFour: "",
      },
    ],
  },
};

const AdultMedicaidData: DataDriven = {
  title: "Adult Core Set Qualifiers: Medicaid",
  questionTitle: "Adult Core Set Questions: Medicaid",
  qualifierHeader: (year) =>
    `As of September 30, ${year}, what percentage of your Medicaid (Title XIX & XXI) enrollees (age 21 and older) were enrolled in each delivery system?`,
  textTable: [
    ["Medicaid (Title XIX & XXI)", "Ages 21 to 64"],
    ["Medicaid (Title XIX & XXI)", "Age 65 and older"],
  ],
  fieldValues: ["TwentyOneToSixtyFour", "GreaterThanSixtyFour"],
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

const ChildData: DataDriven = {
  title: "Child Core Set Qualifiers: Medicaid",
  questionTitle: "Child Core Set Questions: Medicaid",
  qualifierHeader: (year) =>
    `As of September 30, ${year}, what percentage of your Medicaid (Title XIX & XXI) enrollees (under age 21) were enrolled in each delivery system?`,
  textTable: [["Medicaid (TITLE XIX & XXI)", "Under Age 21"]],
  fieldValues: ["UnderTwentyOneMedicaid"],
  formData: {
    PercentageEnrolledInEachDeliverySystem: [
      {
        label: "Fee-for-Service",
        UnderTwentyOneMedicaid: "",
      },
      {
        label: "PCCM",
        UnderTwentyOneMedicaid: "",
      },
      {
        label: "Managed Care",
        UnderTwentyOneMedicaid: "",
      },
      {
        label: "Integrated Care Model (ICM)",
        UnderTwentyOneMedicaid: "",
      },
    ],
    CoreSetMeasuresAuditedOrValidatedDetails: [initialAuditValues],
  },
};

const ChildChipData: DataDriven = {
  title: "Child Core Set Qualifiers: CHIP",
  questionTitle: "Child Core Set Questions: CHIP",
  qualifierHeader: (year) =>
    `As of September 30, ${year}, what percentage of your separate CHIP enrollees (under age 21) were enrolled in each delivery system?`,
  textTable: [["Separate CHIP", "Under Age 21"]],
  fieldValues: ["UnderTwentyOne"],
  formData: {
    PercentageEnrolledInEachDeliverySystem: [
      {
        label: "Fee-for-Service",
        UnderTwentyOne: "",
      },
      {
        label: "PCCM",
        UnderTwentyOne: "",
      },
      {
        label: "Managed Care",
        UnderTwentyOne: "",
      },
      {
        label: "Integrated Care Model (ICM)",
        UnderTwentyOne: "",
      },
    ],
    CoreSetMeasuresAuditedOrValidatedDetails: [initialAuditValues],
  },
};

const ChildMedicaidData: DataDriven = {
  title: "Child Core Set Qualifiers: Medicaid",
  questionTitle: "Child Core Set Questions: Medicaid",
  qualifierHeader: (year) =>
    `As of September 30, ${year}, what percentage of your Medicaid (Title XIX & XXI) enrollees (under age 21) were enrolled in each delivery system?`,
  textTable: [["Medicaid (Title XIX & XXI)", "Under Age 21"]],
  fieldValues: ["UnderTwentyOne"],
  formData: {
    PercentageEnrolledInEachDeliverySystem: [
      {
        label: "Fee-for-Service",
        UnderTwentyOne: "",
      },
      {
        label: "PCCM",
        UnderTwentyOne: "",
      },
      {
        label: "Managed Care",
        UnderTwentyOne: "",
      },
      {
        label: "Integrated Care Model (ICM)",
        UnderTwentyOne: "",
      },
    ],
    CoreSetMeasuresAuditedOrValidatedDetails: [initialAuditValues],
  },
};

const HomeData: DataDriven = {
  title: "Health Home Core Set Qualifiers",
  questionTitle: `Health Home Core Set Questions: SPA ID:`,
  qualifierHeader: (year) =>
    `As of September 30, ${year}, what percentage of your Medicaid Health Home enrollees were enrolled in each delivery system?`,
  textTable: [["Ages 0 to 17"], ["Ages 18 to 64"], ["Age 65 and older"]],
  fieldValues: [
    "ZeroToSeventeen",
    "EighteenToSixtyFour",
    "GreaterThanSixtyFive",
  ],
  formData: {
    PercentageEnrolledInEachDeliverySystem: [
      {
        label: "Fee-for-Service",
        ZeroToSeventeen: "",
        EighteenToSixtyFour: "",
        GreaterThanSixtyFive: "",
      },
      {
        label: "PCCM",
        ZeroToSeventeen: "",
        EighteenToSixtyFour: "",
        GreaterThanSixtyFive: "",
      },
      {
        label: "Managed Care",
        ZeroToSeventeen: "",
        EighteenToSixtyFour: "",
        GreaterThanSixtyFive: "",
      },
      {
        label: "Integrated Care Model (ICM)",
        ZeroToSeventeen: "",
        EighteenToSixtyFour: "",
        GreaterThanSixtyFive: "",
      },
    ],
    CoreSetMeasuresAuditedOrValidatedDetails: [initialAuditValues],
  },
};

export const Data = {
  HHCS: HomeData,
  ACS: AdultData,
  ACSC: AdultChipData,
  ACSM: AdultMedicaidData,
  CCS: ChildData,
  CCSC: ChildChipData,
  CCSM: ChildMedicaidData,
};
