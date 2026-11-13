import { Numeric, NumericString, UploadInfo, YesNo } from "./common";
import { CoreSetAbbr, CoreSetIdentifier } from "./coreSet";

/**
 * The shape of an item in the measure table.
 *
 * Each measure belongs to a CoreSet.
 *
 * There are typically 70+ measures per state per year:
 * 30-some per ACS, 30-some per CCS, and some-teen per HHCS.
 * The exact number per core set varies from year to year; see measureList.ts.
 * It may also vary by state; some states create custom HHCS measures.
 *
 * Each measure is usually defined in its own file:
 * ui-src/src/measures/[year]/[measure]/data.ts
 * Some measures additionally define how they are calculated and rendered,
 * using more files in the same directory.
 * Otherwise, most measures are rendered via measures/[year]/measureTemplate.tsx
 *
 * Almost all measures contain data regarding medical program administration:
 * How many patients received treatment XYZ? How many were eligible? And so on.
 * The exception is the CSQ measure, which contains data at a higher level:
 * How many patients are covered by a core set? Was this data audited? By whom?
 */
export type Measure<TData extends MeasureData | CsqData = MeasureData> = {
  /**
   * Includes state, year, and core set identifier. The Dynamo partition key.
   * @example "AK2021ACS" "CA2021HHCS_19-0037"
   */
  compoundKey: string;

  /** Which U.S. state does this measure belong to? @example "AK" */
  state: string;

  /** Which year does this measure pertain to? @example 2021 */
  year: number;

  /** Which core set does this measure belong to? @example "ACSC" */
  coreSet: CoreSetIdentifier;

  /** What kind of measure is this? @example "FUM-AD" */
  measure: MeasureIdentifier;

  description?: string;

  /** Is data being reported for this measure @example "yes" */
  reporting?: YesNo | null;

  /** Has this measure been completed? @example "incomplete" */
  status: MeasureStatus;

  /** Contains all of the user-entered data for this measure. */
  data?: TData;

  /**
   * When was the measure created? Milliseconds since epoch.
   *
   * This will usually match the core set creation time,
   * but it is overwritten for state-specific measures
   * at the moment the `placeholder` flag changes from `true` to `false`.
   *
   * @example 625825800000
   */
  createdAt: number;

  /**
   * When was this measure most recently modified? Milliseconds since epoch.
   * @example 1792188303331
   */
  lastAltered: number;

  lastAlteredBy?: string;
} & StateSpecificMeasureFields &
  Partial<MeasureMetaDataFields>;

/**
 * What is this Measure measuring?
 *
 * This is usually two parts joined with a dash:
 * The first part indicates what is being measured,
 * and the second part indicates the associated core set.
 * One exception is CSQ, which contains no dash.
 * The other is State-Specific measures, which contain two (as in "SS-1-HH").
 *
 * The portion after the dash is not a CoreSetIdentifier,
 * it is a two-letter abbreviation. AD=Adult, CH=Child, and HH=HealthHome.
 *
 * The portion before the dash is usually 3 letters,
 * but may be anywhere from 2-6, and may include digits.
 *
 * Sometimes the same thing is measured in multiple core sets.
 * For example, we have FUA-AD and FUA-CH and FUA-HH.
 * @example
 * "AMR-AD" "ADD-CH" "IU-HH" "CSQ" "PC01-AD" "NCIDDS-AD" "W3-CH" "PQI92-HH"
 */
export type MeasureIdentifier = string;

export const MeasureStatuses = {
  Complete: "complete",
  Incomplete: "incomplete",
} as const;

export type MeasureStatus =
  (typeof MeasureStatuses)[keyof typeof MeasureStatuses];

export function isMeasureStatus(x: unknown): x is MeasureStatus {
  return Object.values(MeasureStatuses).includes(x as any);
}

/**
 * These fields are present only on custom measures, created within HHCS.
 *
 * We create 5 blank, hidden custom measures when the core set is created;
 * these will have `placeholder: true`.
 * When the user "creates" a custom measure,
 * they are actually just filling in one of these placeholders.
 * At that point it will have `placeholder: false` and `userCreated: true`.
 *
 * This is why users are limited to only five state-specific measures.
 * The `MeasureIdentifier` is always `SS-${x}-HH`, where `x` is a digit 1-5.
 */
type StateSpecificMeasureFields = {
  /** For SS-x-HH measures, `true` until the user "creates" the measure. */
  placeholder?: boolean;
  /** Absent if not user-created. Present and `true` if so. */
  userCreated?: boolean;
  /** Filled in by the user at the time they create the measure */
  detailedDescription?: string;
};

/**
 * These fields affect how the measure is generated and displayed.
 *
 * These are NOT stored in the database.
 * They are copied onto measure objects at time of retrieval,
 * from the lookups in app-api/handlers/dynamoUtils/measureListYYYY.ts
 */
export type MeasureMetaDataFields = {
  autoCompleted?: boolean;
  measureType?: MandatoryTag;
  /** For which core sets will the measureType be displayed? */
  typeTagForCoreSets?: CoreSetAbbr[];
  stratificationRequired?: CoreSetAbbr[];
};
export const MandatoryTags = {
  Mandatory: "Mandatory",
  Provisional: "Provisional",
} as const;
export type MandatoryTag = (typeof MandatoryTags)[keyof typeof MandatoryTags];

/**
 * The shape of the Core Set Quality measure data.
 */
export type CsqData = {
  /** "Yes, some..." or "No, none..." */
  CoreSetMeasuresAuditedOrValidated?: string;
  CoreSetMeasuresAuditedOrValidatedDetails?: {
    WhoConductedAuditOrValidation: string;
    MeasuresAuditedOrValidated: MeasureIdentifier[];
  }[];

  WasExternalContractorUsed?: YesNo;
  /** @example ["EQRO", "MMIS", "dataAnalytics", "Other"] */
  ExternalContractorsUsed?: string[];
  OtherContractorDetails?: string;

  yearlyCostSavings?: NumericString;
  costSavingsMethodology?: string;
  costSavingsFile?: UploadInfo[];

  AdministrativeData?: {
    numberOfIndividuals?: NumericString;
    numberOfChildren?: NumericString;
    numberOfAdults?: NumericString;
    maxAgeChildren?: NumericString;
    minAgeOfAdults?: NumericString;
    numberOfProviders?: NumericString;
  };

  /**
   * This array should have an entry for each delivery system:
   * Fee-for-Service, PCCM, Managed Care, and Integrated Care Model (ICM).
   * It may also have "Other" or custom entries.
   */
  PercentageEnrolledInEachDeliverySystem?: {
    /** The delivery system name. @example "Fee-for-Service" */
    label: string;

    // The presence of these properties depends on the core set.
    TwentyOneToSixtyFour?: NumericString; // ACS, ACSM, ACSC
    GreaterThanSixtyFour?: NumericString; // ACS, ACSM
    UnderTwentyOne?: NumericString; // CCSC, CCSM
    UnderTwentyOneCHIP?: NumericString; // CCS (optional)
    UnderTwentyOneMedicaid?: NumericString; // CCS
    ZeroToSeventeen?: NumericString; // HHCS
    EighteenToSixtyFour?: NumericString; // HHCS
    GreaterThanSixtyFive?: NumericString; // HHCS
  }[];
};

type MeasureDataYesNoFields = {
  [key in
    | "CombinedRates"
    | "DeliverySys-FeeForService"
    | "DeliverySys-IntegratedCareModel"
    | "DeliverySys-MCO_PIHP"
    | "DeliverySys-PrimaryCareManagement"
    | "DenominatorDefineHealthHome"
    | "DenominatorDefineTotalTechSpec"
    | "DidCalculationsDeviate"
    | "DidCollect"
    | "DidReport"
    | "MeasurementPeriodAdhereToCoreSetSpecification"]?: YesNo;
};

type MeasureDataNumericStringFields = {
  [key in
    | "DeliverySys-FeeForService-No-Percent"
    | "DeliverySys-IntegratedCareModel-No-Percent"
    | "DeliverySys-IntegratedCareModel-No-Population"
    | "DeliverySys-MCO_PIHP-No-Excluded"
    | "DeliverySys-MCO_PIHP-No-Included"
    | "DeliverySys-MCO_PIHP-NumberOfPlans"
    | "DeliverySys-Other-NumberOfHealthPlans"
    | "DeliverySys-Other-Percent"
    | "DeliverySys-PrimaryCareManagement-No-Percent"
    | "DenominatorDefineTotalTechSpec-No-Size"
    | "HybridMeasurePopulationIncluded"
    | "HybridMeasureSampleSize"
    | "SmallSampleSizeLessThan30"]?: NumericString;
};

type MeasureDataFreeTextFields = {
  [key in
    | "AdditionalNotes-AdditionalNotes"
    | "ChangeInPopulationExplanation"
    | "CombinedRates-CombinedRates-Other-Explanation"
    | "DataInconsistenciesAccuracyIssues"
    | "DataSource-Admin-Protocol-Other"
    | "DataSource-CAHPS-Version-Other"
    | "DataSource-Included-ItemSets-Other"
    | "DataSourceDescription"
    | "DataSourceNotEasilyAccessible-Other"
    | "DataStatus-ProvisionalExplanation"
    | "DefinitionOfDenominator-Other"
    | "DefinitionOfSurveySample-Changes"
    | "DefinitionOfSurveySample-Other"
    | "DeliverySys-Other"
    | "DenominatorDefineHealthHome-No-Explanation"
    | "DenominatorDefineTotalTechSpec-No-Explanation"
    | "DeviationReason"
    | "HowDidYouReport-Explanation"
    | "InformationNotCollected-Other"
    | "LimitationWithDatCollecitonReportAccuracyCovid"
    | "MeasurementSpecification-OtherMeasurementSpecificationDescription"
    | "OtherPerformanceMeasure-Explanation"
    | "OtherPerformanceMeasure-HybridExplanation"
    | "PartialPopulationNotCoveredExplanation"
    | "WhyAreYouNotReporting-Other"
    | "WhyDidYouNotCollect-Other"
    | "WhyIsDataNotAvailable-Other"]?: string;
};

type MeasureDataRadioFields = {
  AmountOfPopulationNotCovered:
    | "EntirePopulationNotCovered"
    | "PartialPopulationNotCovered";
  "CombinedRates-CombinedRates":
    | "Combined Weighted Rates Other"
    | "Combined Weighted Rates"
    | "Combined Not Weighted Rates";
  "DataSource-Admin-Protocol":
    | "AHRQ CAHPS administrative protocol"
    | "NCQA/HEDIS CAHPS 5.1H administrative protocol"
    | "Other administrative protocol";
  "DataSource-CAHPS-Version": "CAHPS 5.1H" | "Other";
  DataStatus: "ReportingFinalData" | "ReportingProvisionalData";
  HowDidYouReport:
    | "No, we did not submit our CAHPS survey data to the AHRQ CAHPS Database during the June 2024 submission period."
    | "Other"
    | "Submitted raw data to AHRQ (CAHPS Database)"
    | "Yes, we submitted our CAHPS survey data to the AHRQ CAHPS Database during the June 2024 submission period."
    | "yes";
  MeasurementSpecification: MeasurementSpecification;
  "MeasurementSpecification-HEDISVersion":
    | "HEDIS 2020"
    | "HEDIS MY 2020"
    | "HEDIS MY 2021"
    | "HEDIS MY 2022"
    | "HEDIS MY 2023";
};

type MeasureDataCheckboxFields = {
  /**
   * Note that this type is only accurate for 2024 and later years.
   * - Prior to 2024, FVA-AD could have a single string rather than an array.
   *   It would be `"CAHPS 5.1H"` or `"Other"`.
   * - Prior to 2022, AUD-CH could include in its array the string `"Other"`,
   *   rather than the standard `"OtherDataSource"`.
   */
  DataSource: DataSource[];
  DataSourceNotEasilyAccessible: (
    | "Other"
    | "RequireDataLinkage"
    | "RequiresMedicalRecordReview"
  )[];
  DefinitionOfDenominator: (
    | "DenominatorIncCHIP"
    | "DenominatorIncCHIPPop"
    | "DenominatorIncMedicaidAndCHIPPop"
    | "DenominatorIncMedicaidPop"
    | "DenominatorIncMedicareMedicaidDualEligible"
    | "DenominatorIncMedicareMedicaidExpansion"
    | "DenominatorIncOther"
    | "Medicaid (Title XIX)"
    | "Separate CHIP (Title XXI)"
    | "SurveySampleIncCHIP"
  )[];
  DeliverySysRepresentationDenominator: (
    | "FFS"
    | "ICM"
    | "MCO-PIHP"
    | "Other"
    | "PCCM"
  )[];
  DeviationOptions: ("denominator" | "numerator" | "other" | string)[];
  InformationNotCollected: (
    | "NotCollectedByProviderHospitalHealthPlan"
    | "Other"
  )[];
  WhyAreYouNotReporting: (
    | "ContinuousEnrollmentRequirementNotMetDueToStartDateOfSPA"
    | "DataNotAvailable"
    | "LimitationWithDatCollecitonReportAccuracyCovid"
    | "Other"
    | "PopulationNotCovered"
    | "ServiceNotCovered"
    | "SmallSampleSizeLessThan30"
  )[];
  WhyDidYouNotCollect: (
    | "DataNotAvailable"
    | "LimitationWithDatCollecitonReportAccuracyCovid"
    | "Other"
    | "PopulationNotCovered"
  )[];
  WhyIsDataNotAvailable: (
    | "BudgetConstraints"
    | "DataInconsistenciesAccuracyIssues"
    | "DataNotSubmittedByProvidersToState"
    | "DataSourceNotEasilyAccessible"
    | "InformationNotCollected"
    | "Other"
    | "StaffConstraints"
  )[];
};

type MeasureDataRadioOrCheckboxFields = {
  "DataSource-Included-ItemSets":
    | "No, we did not include the CAHPS Item Set for Children with Chronic Conditions in the survey."
    | "Yes, we included the CAHPS Item Set for Children with Chronic Conditions in the survey."
    | (
        | "CAHPS Item Set for Children with Chronic Conditions"
        | "No Supplemental Item Sets were included"
        | "Other CAHPS Item Set"
        | "Supplemental Items for Adult Survey 5.1H"
      )[];
  DefinitionOfSurveySample:
    | "SurveySampleiIncludesCHIPOnly"
    | "SurveySampleIncludesCHIPMedicaidCombined"
    | "SurveySampleIncludesMedicaidOnly"
    | "SurveySamplesIncludeCHIPAndMedicaidSeparately"
    | (
        | "DefOfPopulationOther"
        | "MedicaidExpansionCHIP"
        | "MedicaidTitleXIX"
        | "SurveySampleIncCHIP"
        | "SurveySampleIncMedicaidPop"
        | "SurveySampleIncMedicareMedicaidDualEligible"
        | "SurveySampleIncOther"
      )[];
};

type MeasureDataComplexFields = {
  DateRange: DateRange;
  DataSourceSelections: DataSourceSelections;
  Deviations: Deviations;
  "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload": UploadInfo[];
  PerformanceMeasure: PerformanceMeasure;
  OptionalMeasureStratification: MeasureStratification;
  "OtherPerformanceMeasure-Rates": OtherPerformanceMeasureRate[];
  "AdditionalNotes-AdditionalNotes": UploadInfo[];
};

export type MeasureData = Partial<
  MeasureDataYesNoFields &
    MeasureDataNumericStringFields &
    MeasureDataRadioFields &
    MeasureDataCheckboxFields &
    MeasureDataRadioOrCheckboxFields &
    MeasureDataFreeTextFields &
    MeasureDataComplexFields
>;

export type DateRange = {
  startDate?: DateRangeSelection;
  endDate?: DateRangeSelection;
};

export type DateRangeSelection = {
  selectedMonth?: Numeric;
  selectedYear?: Numeric;
};

/**
 * This flattens the answer for the Data Source (now "Data Collection Method")
 * question component, which contains nested checkboxes and textboxes.
 *
 * The keys may contain numeric suffixes, or join `${parentId}-${childId}`.
 *
 * If, when the user clicked a checkbox, it revealed more checkboxes,
 * then the value here will contain an array of which children they selected.
 *
 * If, when the user clicked a checkbox, it revealed a textbox,
 * then the value here will contain the description they entered.
 * @example
 * const measure = {
 *   data: {
 *     DataSourceSelections: {
 *       AdministrativeData0: {
 *         selected: ["ImmunizationRegistry", "AdministrativeDataOther"],
 *       },
 *       "AdministrativeData0-AdminstrativeDataOther": {
 *         description: "We also found some data in an old filing cabinet",
 *       }
 *     },
 *   },
 * };
 */
export type DataSourceSelections = {
  [key: string]: { selected: string[] } | { description: string };
};

/**
 * The shape of "deviations from measure specification" varies.
 * Previously it depended on whether the measure was single-category;
 * a multi-category measure had a more complicated deviation object.
 * In 2023, it was simplified, regardless of category count.
 *
 * Deviations should only be present if `data.DidCalculationsDeviate` is `"yes",
 * and `data.DeviationOptions` should indicate (pre-2023) the category IDs.
 *
 * TODO: Fact check this. It's a nice story but is it true?
 */
export type Deviations =
  | CategoryDeviations
  | QualifierDeviations
  | FieldDeviations;

/**
 * The shape of Deviations for a pre-2023, multi-category measure
 * @example
 * measure.data = {
 *   DidCalculationsDeviate: "yes",
 *   DeviationOptions: ["MyCategoryOne", "MyCategoryTwo"],
 *   Deviations: {
 *     MyCategoryOne: {
 *       SelectedOptions: ["MyQualifierOne"],
 *       MyQualifierOne: {
 *         RateDeviationsSelected: ["numerator"],
 *         numerator: "explanation of numerator deviation"
 *       }
 *     },
 *     MyCategoryTwo: {
 *       SelectedOptions: ["MyQualifierTwo"],
 *       MyQualifierTwo: {
 *         RateDeviationsSelected: ["denominator"],
 *         denominator: "explanation of denominator deviation"
 *       }
 *     },
 *   }
 * };
 */
type CategoryDeviations = { SelectedOptions: string[] } & {
  [categoryId: string]: QualifierDeviations;
};

/**
 * The shape of Deviations for a pre-2023, single-category measure
 * @example
 * measure.data = {
 *   Deviations: {
 *     MyQualifierOne: {
 *       RateDeviationsSelected: ["numerator"],
 *       numerator: "explanation of numerator deviation"
 *     }
 *   }
 * };
 */
type QualifierDeviations = { RateDeviationsSelected: string[] } & {
  [fieldId: string]: FieldDeviations;
};

/**
 * The shape of Deviations for a 2023 (or later) measure
 * @example
 * measure.data = {
 *   Deviations: {
 *     numerator: "explanation of numerator deviation",
 *   },
 * };
 */
type FieldDeviations = Partial<{
  [field in "numerator" | "denominator" | "other"]: string;
}>;

export type PerformanceMeasure = {
  explanation?: string;
  hybridExplanation?: string;
  rates: {
    [categoryId: string]: RateShape[];
  };
};

/**
 * The shape of the rate objects within a performance measure.
 * Varies by measure and year, in a few ways:
 * - Most measures use NdrRateShape: numerator/denominator/rate.
 * - The `uid` property was introduced in 2023, for all measures.
 *   + Those without it are called "Legacy", to match `isLegacyLabel()`
 * - The `category` property was introduced in 2023, for some measures.
 *   + Namely: AMM, APM, CCP, FUA, FUH, FUM, HBD, IET, IU, MSC, TFL, WCC
 *   + This is helpful for downstream data consumers (that is, DataConnect).
 * - Some measures include an aggregate rate, identified by `isTotal`.
 */
type RateShape =
  | NdrRateShape
  | FieldsRateShape
  | ValueRateShape
  | LegacyNdrRateShape
  | LegacyFieldsRateShape
  | LegacyValueRateShape;

/** Shape for most measures' rates */
export type NdrRateShape = {
  uid: string;
  label: string;
  category?: string;
  isTotal?: boolean;
  numerator?: NumericString;
  denominator?: NumericString;
  rate?: NumericString;
};
export const isNdrRateShape = (x: RateShape): x is NdrRateShape =>
  isLegacyNdrRateShape(x) && "uid" in x;
type LegacyNdrRateShape = Omit<NdrRateShape, "uid" | "category">;
export const isLegacyNdrRateShape = (x: RateShape): x is LegacyNdrRateShape =>
  !("fields" in x) && !("id" in x);

/** Used for AIF-HH and IU-HH */
export type FieldsRateShape = {
  uid: string;
  label: string;
  category?: string;
  isTotal?: string;
  fields: {
    uid: string;
    label: string;
    value?: Numeric;
  }[];
};
export const isFieldsRateShape = (x: RateShape): x is FieldsRateShape =>
  isLegacyFieldsRateShape(x) && "uid" in x;
type LegacyFieldsRateShape = Omit<
  FieldsRateShape,
  "uid" | "category" | "fields"
> & { fields: Omit<FieldsRateShape["fields"], "uid">[] };
export const isLegacyFieldsRateShape = (
  x: RateShape
): x is LegacyFieldsRateShape => "fields" in x;

/** Used for PCR-AD and PCR-HH */
export type ValueRateShape = {
  uid: string;
  label: string;
  id: number;
  value?: NumericString;
};
export const isValueRateShape = (x: RateShape): x is ValueRateShape =>
  isLegacyValueRateShape(x) && "uid" in x;
type LegacyValueRateShape = Omit<ValueRateShape, "uid">;
export const isLegacyValueRateShape = (
  x: RateShape
): x is LegacyValueRateShape => "value" in x;

type OtherPerformanceMeasureRate = {
  rate: {
    numerator: NumericString;
    denominator: NumericString;
    rate: NumericString;
  };
};

type MeasureStratification = {
  options?: string[];
  additionalContext?: string;
  selections?: {
    [omsCategoryId: string]: {
      /* TODO */
    };
  };
};

export const DataSources = {
  Administrative: "AdministrativeData",
  EHR: "ElectronicHealthRecords",
  Hybrid: "HybridAdministrativeandMedicalRecordsData",
  CaseMagementRecordReview: "Casemanagementrecordreview",
  ECDS: "ElectronicClinicalDataSystemsECDS",
  Other: "OtherDataSource",
} as const;
export type DataSource = (typeof DataSources)[keyof typeof DataSources];

export const MeasurementSpecifications = {
  AHRQ: "AHRQ",
  AHRQ_NCQA: "AHRQ-NCQA",
  CMS: "CMS",
  DQA: "ADA-DQA",
  HRSA: "HRSA",
  NCQA_HEDIS: "NCQA/HEDIS",
  OHSU: "OHSU",
  OPA: "OPA",
  Other: "Other",
  PQA: "PQA",
  /** Only for AUD-CH (obsolete in 2022) */
  CDC: "CDC",
  /** Only for PC01-AD (obsolete in 2022) */
  TheJointCommission: "TheJointCommission",
  SAMHSA: "SAMHSA",
} as const;
export type MeasurementSpecification =
  (typeof MeasurementSpecifications)[keyof typeof MeasurementSpecifications];
