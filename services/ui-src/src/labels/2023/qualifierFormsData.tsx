import { initialAuditValues } from "shared/Qualifiers/Common";
import { DataDriven } from "shared/types/TypeQualifierForm";

const AdultData: DataDriven = {
  title: "Adult Core Set Qualifiers",
  questionTitle: "Adult Core Set Questions",
  qualifierHeader: (year) =>
    `As of September 30, ${year} what percentage of your Medicaid/CHIP enrollees (above age 21) were enrolled in each delivery system?`,
  textTable: [["Ages 21 to 64"], ["Age 65 and older"]],
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
  title: "Child Core Set Qualifiers: Medicaid & CHIP",
  questionTitle: "Child Core Set Questions: Medicaid & CHIP",
  qualifierHeader: (year) =>
    `As of September 30, ${year} what percentage of your Medicaid/CHIP enrollees (under age 21) were enrolled in each delivery system?`,
  textTable: [
    ["Medicaid", "Under Age 21"],
    ["CHIP", "Under Age 21"],
  ],
  fieldValues: ["UnderTwentyOneMedicaid", "UnderTwentyOneCHIP"],
  formData: {
    PercentageEnrolledInEachDeliverySystem: [
      {
        label: "Fee-for-Service",
        UnderTwentyOneMedicaid: "",
        UnderTwentyOneCHIP: "",
      },
      {
        label: "PCCM",
        UnderTwentyOneMedicaid: "",
        UnderTwentyOneCHIP: "",
      },
      {
        label: "Managed Care",
        UnderTwentyOneMedicaid: "",
        UnderTwentyOneCHIP: "",
      },
      {
        label: "Integrated Care Model (ICM)",
        UnderTwentyOneMedicaid: "",
        UnderTwentyOneCHIP: "",
      },
    ],
    CoreSetMeasuresAuditedOrValidatedDetails: [initialAuditValues],
  },
};

const ChildChipData: DataDriven = {
  title: "Child Core Set Qualifiers: CHIP",
  questionTitle: "Child Core Set Questions: CHIP",
  qualifierHeader: (year) =>
    `As of September 30, ${year} what percentage of your CHIP enrollees (under age 21) were enrolled in each delivery system?`,
  textTable: [["CHIP", "Under Age 21"]],
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
    `As of September 30, ${year} what percentage of your Medicaid enrollees (under age 21) were enrolled in each delivery system (optional)?`,
  textTable: [["Medicaid", "Under Age 21"]],
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
    `As of September 30, ${year} what percentage of your Medicaid Health Home enrollees were enrolled in each delivery system?`,
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
  ACSC: AdultData,
  ACSM: AdultData,
  CCS: ChildData,
  CCSC: ChildChipData,
  CCSM: ChildMedicaidData,
};
