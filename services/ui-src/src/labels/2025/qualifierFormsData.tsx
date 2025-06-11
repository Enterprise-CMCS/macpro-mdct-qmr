import { initialAuditValues } from "shared/Qualifiers/Common";
import { DataDriven } from "shared/types/TypeQualifierForm";

const AdultData: DataDriven = {
  title: "Adult Core Set Qualifiers: Medicaid",
  questionTitle: "Adult Core Set Questions: Medicaid",
  qualifierHeader: (year) =>
    `As of December 31, ${year}, approximately what percentage of adults in your state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI) were enrolled in each delivery system?`,
  textTable: [
    ["Medicaid (Title XIX & XXI)", "Adults Under Age 65"],
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
  ageQuestion: {
    label:
      "Generally, what are the ages of adults covered in the state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI)",
  },
};

const AdultChipData: DataDriven = {
  title: "Adult Core Set Qualifiers: CHIP",
  questionTitle: "Adult Core Set Questions: CHIP",
  qualifierHeader: (year) =>
    `As of December 31, ${year}, approximately what percentage of adults in your state’s separate CHIP (Title XXI) program were enrolled in each delivery system?`,
  textTable: [["Separate CHIP"]],
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
  ageQuestion: {
    label:
      "Generally, what are the ages of adults covered in the state’s separate CHIP (Title XXI) program?",
  },
};

const AdultMedicaidData: DataDriven = {
  title: "Adult Core Set Qualifiers: Medicaid",
  questionTitle: "Adult Core Set Questions: Medicaid",
  qualifierHeader: (year) =>
    `As of December 31, ${year}, approximately what percentage of adults in your state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI) were enrolled in each delivery system?`,
  textTable: [
    ["Medicaid (Title XIX & XXI)", "Adults Under Age 65"],
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
  ageQuestion: {
    label:
      "Generally, what are the ages of adults covered in the state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI)",
  },
};

const ChildData: DataDriven = {
  title: "Child Core Set Qualifiers: Medicaid",
  questionTitle: "Child Core Set Questions: Medicaid",
  qualifierHeader: (year) =>
    `As of December 31, ${year}, approximately what percentage of children in your state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI) were enrolled in each delivery system?`,
  textTable: [["Medicaid (TITLE XIX & XXI)"]],
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
  ageQuestion: {
    label:
      "Generally, what are the ages of children covered in the state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI)",
  },
};

const ChildChipData: DataDriven = {
  title: "Child Core Set Qualifiers: CHIP",
  questionTitle: "Child Core Set Questions: CHIP",
  qualifierHeader: (year) =>
    `As of December 31, ${year}, approximately what percentage of children in your state’s separate CHIP (Title XXI) program were enrolled in each delivery system?`,
  textTable: [["Separate CHIP"]],
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
  ageQuestion: {
    label:
      "Generally, what are the ages of children covered in the state’s separate CHIP (Title XXI) program?",
  },
};

const ChildMedicaidData: DataDriven = {
  title: "Child Core Set Qualifiers: Medicaid",
  questionTitle: "Child Core Set Questions: Medicaid",
  qualifierHeader: (year) =>
    `As of December 31, ${year}, approximately what percentage of children in your state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI) were enrolled in each delivery system?`,
  textTable: [["Medicaid (Title XIX & XXI)"]],
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
  ageQuestion: {
    label:
      "Generally, what are the ages of children covered in the state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI)",
  },
};

const HomeData: DataDriven = {
  title: "Health Home Core Set Qualifiers",
  questionTitle: `Health Home Core Set Questions: SPA ID:`,
  qualifierHeader: (year) =>
    `As of December 31, ${year}, what percentage of your Medicaid Health Home enrollees were enrolled in each delivery system?`,
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
